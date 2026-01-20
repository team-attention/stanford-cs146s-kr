---
title: "Analyze Cloud Run Logs"
titleKr: "Cloud Run 로그 분석하기"
category: "developer-workflows"
sourceUrl: "https://youtu.be/GJ0NepZmmv8"
---
# Analyze Cloud Run Logs

[영상 바로가기](https://youtu.be/GJ0NepZmmv8)

## 전체 자막

Hi, I'm going to show you today how to use Warp to do backend and production work. One of the coolest things about Warp is that you can prompt it to do any kind of development task from coding to uh working with your cloud servers to doing Docker and Kubernetes. Today, I'm going to have Warp pull some logs for me from one of our cloud servers and do a little bit of analysis on it. Uh, as in previous demos, I'm going to talk to Warp. You can always enable voice mode by clicking this voice input button and um then configure a hotkey to do it.

I would like to use the warp-server-staging g-cloud project and pull logs for the last 10 minutes from the warp-server cloud run instance. Please organize those logs for me into info, warning, and error levels and produce a histogram and report across those log uh message types and specifically call out what are the most uh concerning errors that I might want to investigate.

So I talk to her here. It takes a second to translate it and then I'm going to go ahead and hit enter. And at that point, this has been detected as an agent prompt and the um agent mode will take over, start thinking and executing what I asked it to do. So, as we're doing a coding task, you'll see it start to gather context, or in this case, it knows I want to use warp server staging.

It's going to go ahead and pull logs.

Uh, one of the coolest things about warp is you can always just kind of click in and see exactly what the output is. Uh, I would not have wanted to write this command myself. I'll go back up here.

I'm going to collapse this. Now, it's going to process this data for me here. I think it's going to write a small Python program to do it, which is cool. It's going to debug its own issues. So, first it wants to save the log file to a file. Again, it tells you exactly what it's doing. If you wanted to let this run to completion, you could click the fast forward button. You could also stop it at any time.

Okay, looks like we got to a working version of Python program. We're going to clean up this temp log file.

And here we go. It got a,000 log entries, 980 were info, 11 warning, nine errors, and this makes sense. Most cons. Yeah.

Gemini AI.

Okay.

Cool. So, uh, you can basically ask Warp to do anything. That's the coolest part about it.
