/* eslint-disable prettier/prettier */
import axios from 'axios';
import env from '../../env';

const headers = {
  'Content-Type': 'application/json',
  'X-Master-Key': env.jsonbinKey,
};

/**
 * https://jsonbin.io/api-reference/bins/get-started
 */
const jsonbin = axios.create({
  baseURL: 'https://api.jsonbin.io/v3/b/',
  headers
})

export default jsonbin;