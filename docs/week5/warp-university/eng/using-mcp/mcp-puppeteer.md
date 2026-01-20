---
title: "Using Puppeteer MCP Server"
titleKr: "Puppeteer MCP 서버 사용하기"
category: "using-mcp"
sourceUrl: "https://youtu.be/cYpENRzmpBU"
---
# Using Puppeteer MCP Server

[영상 바로가기](https://youtu.be/cYpENRzmpBU)

## 전체 자막

The Puppet 2 MCP server is great for automating anything in the browser. So to set it up, open up Warps command pallet, type in MCP, and open up the MCP panel. Click add and paste in the JSON config for Puppeteer. Hit save, and you'll see endpoints like Puppeteer navigate, fill, screenshot, and evaluate. For this demo, I'm also going to be showing off Warp's voice input feature. So I can hit the mic icon and speak my prompt. Can you go to Amazon, search for white t-shirt woman, scrape the results, so the titles, the prices, and the links, and then open each product link, and summarize the product reviews, and then I want you to give me a recommendation for which shirt to buy based on the combination of the pricing and the review quality. Warp is going to transcribe what I just said using Whisper. Once I run my prompt, Puppeteer takes over. So, it's going to navigate to Amazon. It's going to find and fill the search bar, capture product data using screenshots and JavaScript selectors. And then it's going to click into each product and scrape review content. You'll see I have Amazon and Warp open side by side here. I'm not touching anything. So, Puppeteer is doing this entire workflow autonomously.

And at the end, it's going to give me a ranked list of white shirts and recommends me the cozy t-shirt, which is eight bucks, 4.5 stars, and seems to have good fit and soft fabric from customer reviews. So, the Puppeteer MCP is perfect for any kind of product research, competitive analysis, or repetitive web scraping that you don't want to do manually.
