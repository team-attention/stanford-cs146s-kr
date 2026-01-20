---
title: "Edit AI-Written Code Inline"
titleKr: "AI가 작성한 코드 인라인 편집"
category: "getting-started"
sourceUrl: "https://youtu.be/dm-P63USsVg"
---
# Edit AI-Written Code Inline

[영상 바로가기](https://youtu.be/dm-P63USsVg)

## 전체 자막

Now I'm starting this agent and having it run. It's going to use the information that I provided the prompt.

It's going to form a task list here and it's going to look across all my files and try and figure out how to make this fix. It's telling me the progress as it goes, showing me the tasks and we'll just kind of watch it do its work here.

So as I mentioned, it uses various search tools. So this is using GP. It's also here when it says searching codebase is using uh codebase embedding to do it search. Okay, it has understood the bug and it tells you that now it's going to start creating diffs for you.

So, one of the things that makes Warp um uniquely powerful compared to other terminal based coding solutions is that this diff here, it shows in a way that you can either accept it if you want or you can do a couple actions to improve it. One is you could reprompt the AI by clicking refine or hitting command R.

That would ask it to recreate the diff using a prompt. You can also just directly edit it. And so, Warp has a built-in code editor here, uh, where if I click this edit thing, I get into an actual editor view here. I don't need to edit it. This is a correct, uh, this is a correct diff. I'm going to hit apply changes, and Warp is going to continue to create the rest of the changes needed to make this fix.

So, this one also looks correct to me.

So, I'm going to apply this change. Now, I'm going to let Warp just run by clicking the fast forward here. So, I'm not going to manually approve every diff. So, another nice thing about Warp is that um you control how much autonomy it has when you need to check in. You can do it on a per agent basis or you can go into settings and configure this more generally. To get to settings, you hit command P, open settings, you go over to AI, and here you can sort of choose what uh autonomy permissions the agent has. I'm going to go back here. Now it's fixed the bug and it's automatically running the uh compile command. It has verified that it compiles. It next wants to format it. I'm going to hit control C to stop that and then I'm going to go ahead and run the code and we can verify that it's been fixed. This is one of the things about Rust. Takes a little takes a minute to compile. Okay, now it's running.

And let's go ahead and verify that the bug has been fixed. So remember this, the bug here was that this checkbox wasn't being honored. Now if I look here, the model picker is gone, which is what we want. If I click this, the model picker comes back. So Warp just fixed a bug purely by prompt. I got to see exactly what it was doing. I had a chance to edit it uh because Warp supports code editing. It found all the right files. It built it for me. It checked my git status. So kind of made it much easier to do this uh to do this task.
