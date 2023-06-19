import axios from 'axios';

async function message(prompt: string) {
  try {
    const res = await axios.post('/api/ai', {
      prompt,
    });
    console.log(res.data);
    return res;
  } catch (e) {
    console.error(e);
  }
}
