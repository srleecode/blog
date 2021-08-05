---
title: Good pull requests
description: Characteristics of good pull requests
tags: Software development
publishedDate: 21/2/2020
published: true
---

# Good pull requests

## Reviewing pull requests is hard

As a pull request (PR) reviewer, it’s your responsibility to make sure that the code is correct and of high quality before it gets merged. You are expected to do that by looking at a diff and list of files changed. You have to understand what the pull request is trying to achieve and what approach is being taken. You then need to use this understanding to potentially suggest improvements. There is a whole lot of things a reviewer needs to consider, especially in a large pull request.

Making it easier for others to review your code, not only makes reviewing the code less difficult for the reviewer it also allows them to develop a better understanding of the code. Good PRs lead to quicker and higher quality reviews as well as better knowledge sharing.

## Characteristic of good pull requests

If there is friction in the pull request process, e.g. reviews are delaying the delivery of code, then it is possible that something related to the creation or format of the pull requests is the cause. Some ways to create pull requests that are easy to review are to:

- Keep pull requests small. This is the number one way to speed up the review time on pull requests. This is because if they are small it is easier for the reviewer to understand the context of the PR. It is easy to make big pull requests and takes more effort to make small logical ones, but the effort is well worth it because it leads to pull requests that are quick to review and therefore quick to get merged.
- Apply the single responsibility principle to your PRs. Just like how you want modules, classes and functions to encapsulate a single responsibility you also want PRs to encapsulate and own a single set of logically interrelated changes. You don't want a PR to contain changes from multiple stories and contexts.
- Write useful descriptions and titles. Writing a useful descriptions in the details section of the PR can reduce the burden and cost involved with large PRs. Helpful descriptions guide the reviewer through the code by highlighting related files and grouping them into concepts or problems that are being solved. This saves the reviewers time because they don't have to review every file as it allows them to quickly determine which ones are the most important and therefore require the most thorough reviews. A useful title involves the JIRA or issue id along with a short description.
- Write useful commit messages. Commit messages are another way of providing context on the changes being made.
- Write comments on the PR to help guide the reviewer through the code or tricky parts of the code. These comments help explain the background context on why a change or workaround was made. Before writing a PR comment ask yourself if you can make the code more readable so that a comment isn't required for it to be understood by the reviewer. PR comments made by the PR creator are for helping the reviewer navigate the PR, not to make up for poorly written or hard to understand code.
- Add screenshots or gifs for front-end changes. Screenshots simplify the review process as they quickly show what has changed and the outcome of the changes which can often be hard to understand by simply looking at the code. They also allow the designer to potentially review the code as well.
- Get everyone om the team to review code. Reviewing code should be everyone's responsibility. This helps the team learn from each other and to realise the importance of writing readable PRs. It is not necessary to provide approval if you review the code and still think that someone else should review the code as well. Although, it is a good idea to add a comment like: "looks good to me" so that others know you have reviewed the code.

## Remain humble and keep your ego separate from the submitted code

Everyone on the team should view pull request reviews as necessary, useful and valuable. The most common reason for people to deviate from this view is that they get emotionally attached to the code they have written and then view comments on it as criticism.

Pull request comments are written for the purpose of starting conversations and ensuring that the quality standards of the written code are met. A good pull request will criticize your code and make you need to rewrite portions of the code to improve its quality. This code is likely to be code that you have spent a lot of time and effort on already. Therefore, pull request comments that are not well aimed can be frustrating especially when they mean that you need rewrite significant parts of the developed code. These feelings are natural and can be useful if they are used as feedback as they can indicate ways in which the pull request process can be improved.

Comments that do not lead to improvements in quality or useful conversations delay the delivery of the code. If there is a feeling that someone is overly picky or focusing too much on things that don't matter, then this should be raised, discussed and resolved. It is important that everyone in the team agrees on the standard pull requesters should be trying to enforce. Otherwise people will find ways around getting their pull requests reviewed thoroughly.

Because the pull request reviewer does not have the full context of the story and the code, due to not writing it, the comments are also as much about exploring and understanding the code as they are about pointing out mistakes. Comments are about finding areas for discussion. Comments, therefore, can be wrong and should be challenged if they are deemed so. A comment being wrong is likely due to the commenter not knowing the full context of the code or story on which the comment is based. This type of comment can still be useful because it starts a discussion. Discussion is important because it allows others to understand the code and why a certain approach was taken. Also, the act of perceptualisation (explaining your code and the reasons why you chose a particular approach) can often lead you or the reviewer to discover better approaches.

## Process for resolving disagreements/code discussions

It is common for the creator of a pull request to disagree with a comment. This is a normal part of the pull request process. When disagreements occur, the below stages should be followed until the disagreement is resolved.

1.  A comment is made and the writer of the code disagrees with a comment
2.  A discussion is started between the reviewer and PR creator to try and reach agreement on whether the comment is correct, i.e. the code needs to be rewritten, or not
3.  An evaluation is started on whether the comment is bikeshedding, i.e. if the issue has minimal impact or is about a preference rather than an actual issue.
4.  A deeper discussion is started to discover:
    - If the comment is bikeshedding, is the pull request commenter happy for the comment to be skipped. Note that small issues are not the same as bikeshedding, a small issue that continually occurs should be raised and handled. Although it is a small issue, if it occurs multiple times tte cost of it can add up. Therefore, a small issue doesn't need to be resolved in the pull request, but it is a good idea to track it or talk about how it will be handled elsewhere.
    - if the comment is not bikeshedding, then a way to resolve it should be figured out
5.  Assuming agreement on the approach forwards still hasn't been reached. Then the reviewer and PR creator should step back from the problem and look into the available evidence to construct arguments for potential solutions or reasons why the comment should be skipped.
6.  Assuming agreement still hasn't been reached, get another developer involved for an outside view and to evaluate the argument constructed in the previous stage.
