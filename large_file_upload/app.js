const express = require('express');
const multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());
app.use('/', express.static('./public'));

app.post('/upload_file_thunk', (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.json({
        code: 0,
        data: {},
      });
    } else {
      // save chunk files
      console.log(fields);
      fs.mkdirSync('./public/uploads/thunk/' + fields['filename'][0], {
        recursive: true
      });
      // move
      console.log('files', files);
      fs.renameSync(files['chunk'][0].path, './public/uploads/thunk/' + fields['filename'][0] + '/' + fields['name'][0]);
      res.json({
        code: 1,
        data: '分片上传成功',
      });
    }
  });
});

/**
 * 文件合并
 * @param {*} sourceFiles 源文件
 * @param {*} targetFile  目标文件
 */
function thunkStreamMerge(sourceFiles, targetFile) {
  const thunkFilesDir = sourceFiles;
  const list = fs.readdirSync(thunkFilesDir); // 读取目录中的文件

  const fileList = list
    .sort((a, b) => a.split('_')[1] * 1 - b.split('_')[1] * 1)
    .map((name) => ({
      name,
      filePath: path.resolve(thunkFilesDir, name),
    }));
  const fileWriteStream = fs.createWriteStream(targetFile);
  thunkStreamMergeProgress(fileList, fileWriteStream, sourceFiles);
}

/**
 * 合并每一个切片
 * @param {*} fileList        文件数据
 * @param {*} fileWriteStream 最终的写入结果
 * @param {*} sourceFiles     文件路径
 */
function thunkStreamMergeProgress(fileList, fileWriteStream, sourceFiles) {
  if (!fileList.length) {
    // thunkStreamMergeProgress(fileList)
    fileWriteStream.end('完成了');
    // 删除临时目录
    // if (sourceFiles)
    //     fs.rmdirSync(sourceFiles, { recursive: true, force: true });
    return;
  }
  const data = fileList.shift(); // 取第一个数据
  const { filePath: chunkFilePath } = data;
  const currentReadStream = fs.createReadStream(chunkFilePath); // 读取文件
  // 把结果往最终的生成文件上进行拼接
  currentReadStream.pipe(fileWriteStream, { end: false });
  currentReadStream.on('end', () => {
    // console.log(chunkFilePath);
    // 拼接完之后进入下一次循环
    thunkStreamMergeProgress(fileList, fileWriteStream, sourceFiles);
  });
}

// 合并切片
app.post('/upload_thunk_end', (req, res) => {
  const fileName = req.body.filename;
  const extName = req.body.extname;
  const targetFile = './public/uploads/' + fileName + '.' + extName;
  thunkStreamMerge('./public/uploads/thunk/' + fileName, targetFile);
  res.json({
    code: 1,
    data: targetFile,
  });
});


function getLocalIP() {
  const os = require('os');
  //获取本机ip
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}


port = 9000;

const ip = getLocalIP();
console.log('ip', ip);
app.listen(port, () => console.log(`server running on ${getLocalIP()}:${port}......`));
