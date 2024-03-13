import rateLimit from "express-rate-limit";

import rateLimitOptions from "@/configs/rate-limit";

export default rateLimit(rateLimitOptions);
