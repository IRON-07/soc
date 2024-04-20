const fs = require('fs');
const xlsx = require('xlsx');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Nhập đường dẫn của tệp Excel (.xlsx): ', (filePath) => {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const range = xlsx.utils.decode_range(worksheet['!ref']);
    const rows = [];

    for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
        let row = [];
        for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
            const cellAddress = xlsx.utils.encode_cell({ r: rowNum, c: colNum });
            const cell = worksheet[cellAddress];
            if (cell && cell.v !== undefined) {
                row.push(cell.v);
            } else {
                row.push('');
            }
        }
        rows.push(row);
    }

    const filteredRows = rows.map((row, index) => {
        if (index < 6) { // Giữ nguyên 6 dòng đầu tiên
            return row;
        } else {
            const firstCell = row[0];
            if (typeof firstCell === 'string') {
                return [firstCell.replace(/^(A\.|A\. |B\.|B\. |C\.|C\. |D\.|D\. )/, ''), ...row.slice(1)];
            } else {
                return row;
            }
        }
    });

    const newSheet = xlsx.utils.aoa_to_sheet(filteredRows);
    const newWorkbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(newWorkbook, newSheet, sheetName);

    xlsx.writeFile(newWorkbook, filePath);

    console.log("Xóa thành công các dòng có tiền tố từ dòng thứ 7 trở xuống.");
    rl.close();
});
