function generateWord() {
  const words = ["Abrakadabra", "PinkCat", "BlueDog"];
  const randomWord = Math.floor(Math.random() * words.length);
  const wordToType = words[randomWord];
  return <b>{wordToType}</b>;
}
export default generateWord;
