const CoursesXMLsplit = (xml, tag) => {
  const tagcontent = [];
  let block = [];
  let newblock = false;
  for (let i = 0; i < xml.length; i++) {
    if (xml.charAt(i) === '<' && xml.slice(i, i + tag.length + 2) === '<' + tag + ' ') {
      newblock = true;
    }
    if (newblock) {
      block.push(xml.charAt(i));
    }
    if (xml.charAt(i) === '>' && xml.slice(i - tag.length - 2, i + 1) === '</' + tag + '>') {
      newblock = false;
      tagcontent.push(block.join(''));
      block = [];
    }
  }
  return tagcontent;
};

export default CoursesXMLsplit;
