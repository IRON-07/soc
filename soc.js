const fs = require('fs');

// Đọc file gốc
fs.readFile('original.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Tách dòng
    const lines = data.split('\n');

    // Tính số lượng file cần tạo
    const numFiles = Math.ceil(lines.length / 5);

    // Tạo các file mới
    for (let i = 0; i < numFiles; i++) {
        const startIndex = i * 5;
        const endIndex = Math.min(startIndex + 5, lines.length);
        const filename = `part${i + 1}.txt`; // Tên file mới

        // Lấy phần dòng từ startIndex đến endIndex
        const fileContent = lines.slice(startIndex, endIndex).join('\n').trim();

        // Viết nội dung vào file mới
        fs.writeFile(filename, fileContent, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`Đã tạo ${filename}`);
        });
    }
});
