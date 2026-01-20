---
title: "How to Setup Ollama using Warp"
titleKr: "Warp로 Ollama 설정하기"
category: "developer-workflows"
sourceUrl: "https://youtu.be/Aq8vDxUg4VE"
---
# How to Setup Ollama using Warp

[영상 바로가기](https://youtu.be/Aq8vDxUg4VE)

## 전체 자막

If you want to run some AI models locally, Olama is one of the fastest ways you can get started. In this video, I'll show you how to use Warp to set up Olama in the easiest way. You'll profile your device to see what you can run, see the difference between models, and run it on your device and integrate Olama into your application. Running LLMs locally is heavy on any system. So, before we start with Olama, let's see what we're working with. To run LLMs locally, you need some beefy specs. On Mac, you have the unified memory. I have 64 gigs on this machine. On Windows, I have an Nvidia RTX 590 which has 32 GB of VRAM. The difference here is that Mac can hold larger models with weaker performance while the Nvidia cards can have extreme performance, but at the cost of not fitting it all into VRAM.

Once you have an understanding of your specs, let's install Olama. Ola is one of the easiest ways we can run AI models locally. It's free and can run entirely on your command line. Once we download, let's open up Warp and see if it installed correctly. If you're familiar with other registrybased command line tools like Docker or MPM, then this will feel very familiar. We can easily run an AI model by doing Olama run model. But what AI model should we use refer to your system specs to see what is doable for you. But if you look on Olama's website, you'll be able to see the parameters that the model size is. Let's give two models a try. First, let's give the Open AI GPT OSS 20 billion parameter model a try. This model is very good and capable. It needs at least 16 GB of VRAM and additional for the context. But what's so cool about this model is its ability for tool calls. To show this feature, Olama has a built-in web search feature in the desktop app. Do know that this does require an Olama login to prevent abuse unless turbo mode is enabled. The model itself is still running locally.

Now let's give another model a try. Quen 3 8 billion parameters.

This is way faster. However, you can see that the quality of output just isn't quite the same. This is where it becomes super important to test what works for you and what doesn't. Some large language models don't have to be that smart. They just have to be fast and sort of accurate. Other large language models have more defining features, like some are better at code while others are better at creative writing. There are benchmarks online, but of course, be skeptical. The real way to determine what's best for you is just to try them.

Large language models come in all different types of flavors. Here are some different terms simplified so that we're choosing a local model, it's a lot easier to pick. Thinking is when the model thinks to itself in large blocks of text before giving you an answer.

This is usually best when you're trying to figure out some complex problem and need a little bit more time to think.

Tools are things you can give a large language model to use when it's figuring out an answer. For example, I could give it a web search tool and rather than just guess what my query is, it can decide to use that tool instead. Vision has the ability to look at images and include it within its responses.

Embedding is outside the large language models specifically. It turns your text into a mathematical format that can make applications using natural language search much easier. The number B part represents the amount of billions of parameters. The higher the number, the more intelligent the model is, but also requires much more processing power.

It's safe to say that the amount of VRAM should be equal to the amount of parameters in billions. For example, 1 billion parameters is 1 GB of VRAM, give or take. The quantization is a form of reducing the memory of a large language model while sacrificing quality. By default, Olama will download all your models using 4-bit quantization, which is a good middle ground between optimization and not having too much performance hit. In general, just use the large language model that gives you the features that you want and nothing more. Now, it's one thing to run this on the command line, but you realistically want to integrate this into something different. Good news. It's actually really simple and most likely doesn't really need any refactoring. Most large language models use the OpenAI compatible endpoints. Most likely your application does as well. So I'm going to ask Warpier to go to my code file and search for where I initialized the OpenAI client. Then I'm just going to switch out the base URL with this is the default. And insert as the API key. Then where you get your chat completion endpoint, just insert the model that you want to use. The great part about Olama is that it will automatically spin up the large language model once it's initialized and background it when it's inactive. If your app is local first and this is a great way to save on resources. Of course though you can bypass this completely by integrating some sort of polling feature or just completely disabling the time to live altogether. Now, every single chat application you use has customizable features that you can play with like the temperature, system prompt, top P, and this is also possible in O Lama. First, let's pull the model that we want to edit to make sure it's on our computer.

We can then save this as a new model so we can use it at another time. Here's a great tip. Use Warp to build a model file for you so that you get a much more detailed prompt and system message for what you need. So, for example, I'm going to ask Warp to create a model file for a YouTube title generator. And then it's going to be a much more detailed system prompt that you can use.

And there you go. Olama running large language models locally.
