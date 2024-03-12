const cryptoSlang = [
  'hodl',
  'wen lambo',
  'wagmi',
  'pump and dump',
  'rug pull',
  'choose rich',
  'weak hands',
  'whales only',
  'weak hands',
  'do your own research',
  'bagholder',
  'to the moon',
  'normie',
  'bitcoin maxi',
  'solana manlets',
  'diamond hands',
  'buy the dip',
  'sell the bottom',
  'buy the top',
  'wen marketing',
  'so much fud',
  'looking for entry',
  'are you winning son',
  'number go up',
  'bayc hacked',
  'deploying more capital',
  'your size is not size',
  'ill buy as much sol as you have. then go fuck off.',
  'funds are safu',
  'kevin o leary',
  'sam bankman fried',
  'do kwon',
  'all time high',
  'bull market',
  'legendary fumble',
  'michael saylor',
  'liquidity pulled',
  'community takeover',
  'negative six figures',
  'all time high',
  'just the beginning',
  'not financial advice',
  'fomo',
  'wen lambo',
  'pepe',
  'three arrow capital',
  'solana meme coin generator',
];

const testSlang = [
  'so much fud',
  'looking for entry',
  'are you winning son',
  'number go up',
  'bayc hacked',
  'deploying more capital',
  'your size is not size',
  'ill buy as much sol as you have. then go fuck off.',
  'funds are safu',
  'kevin o leary',
  'sam bankman fried',
  'all time high',
  'legendary fumble',
  'liquidity pulled',
  'negative six figures',
  'all time high',
  'just the beginning',
  'fomo',
  'wen lambo',
  'three arrow capital',
  'solana meme coin generator',
];

function generateMemeCoinName() {
  const vowelSubstitutions = { a: 'e', e: 'a', i: 'o', o: 'i', u: 'e' };
  const consonantSubstitutions = { t: 'd', p: 'b' };

  let output = '';

  // const input = cryptoSlang[Math.floor(Math.random() * cryptoSlang.length)];
  const input = testSlang[Math.floor(Math.random() * testSlang.length)];

  for (let i = 0; i < input.length; i++) {
    if (
      i == 0 ||
      input[i - 1] == ' ' ||
      input[i + 1] == ' ' ||
      i == input.length - 1
    ) {
      output += input[i];
    } else if (input[i + 1] == input[i]) {
      output += input[i];
    } else {
      if (vowelSubstitutions[input[i]]) {
        output += vowelSubstitutions[input[i]];
      } else if (consonantSubstitutions[input[i]]) {
        output += consonantSubstitutions[input[i]];
      } else {
        output += input[i];
      }
    }
  }

  output = `${output}${output.slice(-1)}`;

  // Add any additional transformations here.

  console.log(output);
}

for (let j = 0; j < 10; j++) {
  generateMemeCoinName();
}
