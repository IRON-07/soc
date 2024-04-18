const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function splitLines(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Không thể đọc:', err);
      rl.close();
      return;
    }

    const lines = data.split('\n');

    // Thư mục lưu file mới
    const outputDir = './output'; 
    fs.mkdirSync(outputDir, { recursive: true });

    // Tạo và lưu các file mới
    for (let i = 0; i < 5; i++) {
      const newFileName = `part${i + 1}.txt`; 

      let fileContent = '';
      for (let j = 0; j < lines.length; j++) {
        const lineIndex = (i * 5 + j) % 5;
        if (lineIndex === i) {
          fileContent += lines[j] + '\n';
        }
      }

      const outputFilePath = path.join(outputDir, newFileName); 
      fs.writeFile(outputFilePath, fileContent.trim(), (err) => {
        if (err) {
          console.error('Không thể tạo:', err);
          rl.close();
          return;
        }
        console.log(`Đã tạo ${outputFilePath}`);
      });
    }

    rl.question('', (answer) => {
      if (answer.toLowerCase() === 'y') {
        rl.question('Nhập file ', (nextFilePath) => {
          splitLines(nextFilePath); 
        });
      } else {
        rl.close();
      }
    });
  });
}

rl.question('Nhập đường dẫn và tên file (.txt) bạn muốn tách: ', (filePath) => {
  splitLines(filePath); 
});
