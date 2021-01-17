export const uuid = () => {
  const str = 'abcdefghijklmnopqrstuvwxyz123456789#$%_';
  const n = str.length;
  let uid = '';
  for(var i=0;i<12;i++){
    uid += str[Math.floor(Math.random() * n)];
  }
  return uid;
}