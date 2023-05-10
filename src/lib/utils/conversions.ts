/**
 * Convert hex string/Buffer to 0x-prefixed hex string OR convert decimal number to 0x-prefixed hex string
 * @param {string | Buffer | number} exp - hex string (e.g. 'a2'), hex Buffer, decimal number (e.g. 22)
 * @returns {string} - 0x-prefixed hex string (e.g. 'ab' -> '0xab',  22 -> '0x16')
 */
function hexify(exp: string | Buffer | number): string {
  if (Buffer.isBuffer(exp)) {
    return '0x' + exp.toString('hex');
  }

  if (typeof exp === 'number') {
    return '0x' + exp.toString(16);
  }

  return '0x' + exp;
}

/**
 * Convert hex string/Buffer to decimal number
 * @param {string | Buffer | number} exp - hex string (e.g. '02ab' or with 0x-prefix '0x02ab), hex Buffer (e.g. <Buffer 02 ab>)
 * @returns {string} - decimal number (e.g. '02ab' -> 683, '0x02ab' -> 683,  <Buffer 02 ab> -> 683)
 */
function decimal(exp: string | Buffer): number {
  if (Buffer.isBuffer(exp)) {
    return exp.readInt16BE(0);
  }

  return parseInt(exp, 16);
}

/**
 * Convert UNIX timestamp to ISO string including date
 * @param epoch - UNIX timestamp (e.g. 1634473161)
 * @returns {string} - "2022-03-31T10:58:13.000Z"
 */
function toISO(epoch: number): string {
  return new Date(epoch * 1000).toISOString();
}

function gweiToEther(gwei: number): number {
  return gwei * Math.pow(10, -9);
}

function toGwei(exp: string | number | undefined, from: 'wei' | 'ether'): number | null {
  if (typeof exp === 'undefined') return null;

  switch (from) {
    case 'wei':
    default: {
      if (typeof exp === 'number') {
        return exp / 10 ** 9;
      } else {
        const wei = parseInt(exp, 16);
        return wei / 10 ** 9;
      }
    }

    case 'ether': {
      if (typeof exp === 'number') {
        return exp * 10 ** 9;
      } else {
        const ether = parseInt(exp, 16);
        return ether * 10 ** 9;
      }
    }
  }
}

function minutes(ms: number): string {
  const m = Math.floor(ms / 60000);
  const s: number = +((ms % 60000) / 1000).toFixed(0);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export { hexify, decimal, toISO, toGwei, gweiToEther, minutes };
