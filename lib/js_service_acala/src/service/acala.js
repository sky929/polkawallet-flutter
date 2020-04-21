import { formatBalance } from "@polkadot/util";
import {
  Fixed18,
  convertToFixed18,
  calcSupplyInBaseToOther,
  calcSupplyInOtherToBase,
  calcSupplyInOtherToOther,
  calcTargetInBaseToOther,
  calcTargetInOtherToBase,
  calcTargetInOtherToOther,
} from "@acala-network/app-util";

/**
 * get token balances of an address
 * @param {String} currencyId
 * @param {String} address
 * @returns {String} balance
 */
async function getTokens(currencyId, address) {
  const res = await api.query.tokens.accounts(currencyId, address);
  return formatBalance(res.free, { forceUnit: "-", withSi: false });
}

/**
 * calc token swap amount
 * @param {Api} api
 * @param {Number} supply
 * @param {Number} target
 * @param {List<String>} swapPair
 * @param {Number} baseCoin
 * @param {Number} slippage
 * @returns {String} output
 */
async function calcTokenSwapAmount(
  api,
  supply,
  target,
  swapPair,
  baseCoin,
  slippage
) {
  const pool = await Promise.all([
    api.derive.dex.pool(swapPair[0]),
    api.derive.dex.pool(swapPair[1]),
  ]);
  const feeRate = api.consts.dex.getExchangeFee;
  let output;
  if (target == null) {
    if (baseCoin == 0) {
      output = calcTargetInBaseToOther(
        Fixed18.fromNatural(supply),
        _dexPoolToFixed18(pool[1]),
        convertToFixed18(feeRate),
        Fixed18.fromNatural(slippage)
      );
    } else if (baseCoin == 1) {
      output = calcTargetInOtherToBase(
        Fixed18.fromNatural(supply),
        _dexPoolToFixed18(pool[0]),
        convertToFixed18(feeRate),
        Fixed18.fromNatural(slippage)
      );
    } else {
      output = calcTargetInOtherToOther(
        Fixed18.fromNatural(supply),
        _dexPoolToFixed18(pool[0]),
        _dexPoolToFixed18(pool[1]),
        convertToFixed18(feeRate),
        Fixed18.fromNatural(slippage)
      );
    }
  } else if (supply == null) {
    if (baseCoin == 0) {
      output = calcSupplyInBaseToOther(
        Fixed18.fromNatural(target),
        _dexPoolToFixed18(pool[1]),
        convertToFixed18(feeRate),
        Fixed18.fromNatural(slippage)
      );
    } else if (baseCoin == 1) {
      output = calcSupplyInOtherToBase(
        Fixed18.fromNatural(target),
        _dexPoolToFixed18(pool[0]),
        convertToFixed18(feeRate),
        Fixed18.fromNatural(slippage)
      );
    } else {
      output = calcSupplyInOtherToOther(
        Fixed18.fromNatural(target),
        _dexPoolToFixed18(pool[0]),
        _dexPoolToFixed18(pool[1]),
        convertToFixed18(feeRate),
        Fixed18.fromNatural(slippage)
      );
    }
  }
  return output.toString();
}

function _dexPoolToFixed18(pool) {
  return {
    base: convertToFixed18(pool.base),
    other: convertToFixed18(pool.other),
  };
}

export default {
  getTokens,
  calcTokenSwapAmount,
};