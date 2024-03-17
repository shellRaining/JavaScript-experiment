function sliceFile(file, size = 1024 * 1024) {
  const res = [];

  let cur = 0;
  while (cur < file.size) {
    res.push(file.slice(cur, cur + size));
    cur += size;
  }

  return res;
}

function uploadFile(e) {
  const file = e.currentTarget.files[0];
  const fileList = sliceFile(file);
  const uuid = file.name;
  const uploadList = fileList.map((item, index) => {
    const formData = new FormData();
    formData.append("chunk", fileList[index]);
    formData.append("name", `${uuid}_${index}`);
    formData.append("filename", uuid);
    return axios.post("/upload_file_thunk", formData);
  });
  Promise.all(uploadList).then((_value) => {
    console.log("upload success");
    axios
      .post("/upload_thunk_end", {
        filename: uuid,
        extname: file.name.split(".").slice(-1)[0],
      })
      .then((res) => {
        console.log(res.data);
      });
  });
}
