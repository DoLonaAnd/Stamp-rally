const crypto = require('crypto');

// SHA-256ハッシュを生成する関数
function generateSHA256(input) {
    try {
        return crypto.createHash('sha256').update(input, 'utf8').digest('hex');
    } catch (error) {
        console.error('ハッシュの生成中にエラーが発生しました:', error);
    }
}

// コマンドライン引数から入力を受け取る
const input = process.argv[2];

if (!input) {
    console.error('入力値を指定してください。');
    process.exit(1);
}

const hash = generateSHA256(input);
if (hash) {
    console.log(`SHA-256: ${hash}`);
}
