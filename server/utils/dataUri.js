import DataUriParser from "datauri/parser.js"
import path, { parse } from "path"

export const getDataUrl = (file)=>{
   const parser = new DataUriParser();
   const extName = path.extname(file.originalname).toString();
   return parser.format(extName,file.buffer);
}
