const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Nhập đường dẫn của tệp văn bản: ', (filePath) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Lỗi khi đọc tệp:", err);
            rl.close();
            return;
        }

        const lines = data.split('\n');

        const filteredLines = lines.map(line => {
            return line.replace(/^(A\.|A\. |B\.|B\. |C\.|C\. |D\.|D\. )/, '');
        });

        fs.writeFile(filePath, filteredLines.join('\n'), 'utf8', (err) => {
            if (err) {
                console.error("Lỗi khi ghi lại vào tệp:", err);
                rl.close();
                return;
            }
            console.log("Xóa thành công các dòng có tiền tố.");
            rl.close();
        });
    });
});
