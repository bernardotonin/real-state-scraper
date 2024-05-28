import { fetchFromZap } from "../lib/utils.js";
import { saveMany } from "../repository/PropertyRepository.js";

export const ZapScrape = async () => {
  let from = 0;
  let size = 110;

  for (let i = 0; i < 23; i++) {
    const result = await saveMany(await fetchFromZap(from, size))
    console.log(`${result} | ${i}`)
    //console.log(await fetchFromZap(from, size))
    from += size - 2;
  }
}