import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import { config } from '../config/index.js';
import type { MLAnalysisResult } from '../types/index.js';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const analyzeImage = async (imagePath: string): Promise<MLAnalysisResult> => {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const formData = new FormData();
      formData.append('image', fs.createReadStream(imagePath));

      const response = await axios.post(
        `${config.mlServiceUrl}/predict`,
        formData,
        {
          headers: formData.getHeaders(),
          timeout: 30000,
        }
      );

      return response.data;
    } catch (error: any) {
      lastError = error;
      console.error(`ML service request failed (attempt ${attempt}/${MAX_RETRIES}):`, error.message);

      if (attempt < MAX_RETRIES) {
        const delay = RETRY_DELAY * Math.pow(2, attempt - 1);
        await sleep(delay);
      }
    }
  }

  throw new Error(`ML service failed after ${MAX_RETRIES} attempts: ${lastError?.message}`);
};
