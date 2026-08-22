# Elliott.page

# Product & Architecture Manifesto v1.1

**Version:** 1.1
**Status:** Architecture Baseline / North Star Document
**Owner:** Elliott Bai
**Domain:** elliott.page
**Category:** Personal Internet Space / Digital Garden / Personal Knowledge System

---

# 0. 文档定位

## 0.1 Purpose

Elliott.page 不是一个传统博客项目。

它不是：

- 简历展示网站（Portfolio）
- 求职主页（Resume Site）
- 内容流平台（Content Platform）
- 社交媒体替代品（Social Network）
- 技术炫技项目（Frontend Showcase）

它是：

> **Elliott Bai 在开放互联网中的长期个人空间。**

一个由自己拥有、持续演化、记录思想与经历的数字栖居地（Digital Habitat）。

---

## 0.2 Core Definition

> **Elliott.page is a long-term personal space owned by Elliott Bai on the open web.**

它用于：

- 保存值得留下的思想；
- 发布经过整理的作品；
- 记录个人成长轨迹；
- 建立独立于平台之外的长期数字身份；
- 让内容随着时间形成个人知识体系。

---

# 1. 核心愿景：从 Website 到 Digital Habitat

传统个人网站通常回答：

> “我是谁？我做过什么？”

Elliott.page 回答：

> “我是如何思考、创造和成长的？”

---

## 1.1 Digital Room Model

Elliott.page 更像：

> 一个属于 Elliott 的互联网房间。

进入这个空间的人，可以：

- 阅读他的文字；
- 了解他的关注；
- 观察他的思想变化；
- 发现长期积累形成的东西。

它不是一个静态介绍页。

它是一种：

> **个人时间与思想的容器。**

---

# 2. 三层核心模型

Elliott.page 由三个基础能力组成：

```text
                    Elliott.page

                         |
        +----------------+----------------+
        |                |                |
        v                v                v

    Identity       Publication       Memory

    我是谁          我创造什么        我留下什么
```

---

# 2.1 Identity

## 定义

Elliott.page 是 Elliott Bai 在互联网中的稳定身份入口。

它回答：

> “这个人是谁？”

包含：

- About
- Contact
- External Links
- Current Focus

---

原则：

> 平台账号属于平台，域名属于自己。

GitHub、LinkedIn、未来未知的平台，都只是 Elliott.page 的外部入口。

---

# 2.2 Publication

## 定义

个人出版系统。

它回答：

> “这个人在创造和思考什么？”

内容包括：

- 长文章；
- 技术探索；
- 阅读思考；
- 个人观察；
- 深度分析。

---

# 2.3 Memory

## 定义

个人时间记录系统。

它回答：

> “这个人如何随着时间变化？”

包括：

- 阶段性想法；
- 学习过程；
- 未完成思考；
- 人生片段。

---

# 3. 核心设计原则

---

# Principle 1：Own First

## 我的内容，我拥有

所有核心资产：

- Domain
- Source Code
- Content
- Data

必须：

- 自主控制；
- 可迁移；
- 不依赖单个平台。

---

避免：

- 平台锁定；
- 私有数据库；
- 不可导出的 CMS。

---

# Principle 2：Durable First

## 为十年后的自己设计

优先：

- 稳定 URL；
- 开放格式；
- 简单架构；
- 长期维护。

避免：

- 短期技术潮流；
- 复杂运行时；
- 无必要依赖。

---

# Principle 3：Content First

技术服务内容。

设计优先级：

```text
Content

 ↓

Typography

 ↓

Layout

 ↓

Interaction

 ↓

Decoration
```

---

# Principle 4：Quiet Design

## 不争夺注意力

拒绝：

- 无限滚动；
- 点赞；
- 热榜；
- 推荐算法；
- 强动画；
- 信息噪音。

追求：

- 安静；
- 清晰；
- 长时间阅读舒适。

---

# Principle 5：Evolutionary Design

## 允许系统自然成长

不要试图第一天定义未来十年。

结构应该：

```text
v1

Writing + Notes

        ↓

v2

Topics + Garden

        ↓

v3

Knowledge Graph + AI
```

---

# Principle 6：Knowledge Garden

## 内容不是归档，而是生长

传统博客：

```text
时间线
 |
 |
文章越来越沉底
```

Elliott.page：

```text
             Idea

              |

        +-----+-----+

        |           |

     Writing      Notes

        |

     Knowledge

        |

     Future AI
```

---

内容之间应该逐渐形成：

- 关联；
- 引用；
- 主题；
- 思想脉络。

---

但保持克制：

第一阶段：

只需要：

```yaml
title:
date:
tags:
```

未来再增加：

- backlinks
- wikilinks
- semantic relations

---

# Principle 7：Capture Before Publish

## 记录优先于发布

最大的敌人：

不是技术。

是：

> 发布摩擦。

---

内容生命周期：

```text
Capture Inbox

      |

      |

Notes

      |

      |

Writing

      |

      |

Archive
```

---

允许：

- 半成品；
- 草稿；
- 碎片思想。

因为：

> 未完成的思想，也具有价值。

---

# Principle 8：Open Web Native

## 属于开放互联网

核心能力：

必须支持：

- RSS；
- Stable URL；
- Sitemap；
- Portable Content。

---

RSS 不是附加功能。

它代表：

> 用户主动订阅，而不是被算法分发。

---

# Principle 9：Human First, AI Second

## AI 是增强层，不是入口

错误：

```text
AI Chat

    |

Content
```

正确：

```text
Content

    |

Knowledge

    |

AI Interface
```

---

AI 应该帮助：

- 搜索；
- 理解；
- 关联；
- 探索。

而不是替代人的表达。

---

# 4. 内容模型 Content Model

---

# 4.1 Writing

## 定义

完整、有结构、长期保存的作品。

例如：

- 深度文章；
- 架构分析；
- 长篇思考。

特点：

- 稳定 URL；
- 长生命周期；
- 可引用。

---

# 4.2 Notes

## 定义

思想的原始形态。

例如：

- 阅读笔记；
- 灵感；
- 短观点；
- 学习记录。

特点：

- 低发布成本；
- 允许不完整；
- 可以演化。

---

# 4.3 About

不是 Resume。

不是：

```
Skills
Experience
Awards
```

而是：

- 我是谁；
- 我关注什么；
- 为什么创建这个空间。

---

# 4.4 Now

## Periodic Snapshot

不是实时状态。

用于记录：

> 当前阶段的自己。

格式：

```text
Now

Last updated:
August 2026

Building:

Learning:

Reading:
```

保持简短。

---

# 5. 内容演化模型

```text
Idea

 ↓

Capture

 ↓

Note

 ↓

Writing

 ↓

Archive

 ↓

Knowledge Graph
```

---

# 6. 双语策略

## Bilingual by nature

不是：

每篇文章必须翻译。

而是：

语言服务表达。

---

例如：

```text
Writing

English Essay

中文文章


Notes

中文记录

English Thought
```

---

避免：

Translation Debt。

---

# 7. 信息架构

## v1

```text
elliott.page

├── /
│
├── /writing
│
├── /notes
│
├── /about
│
├── /now
│
└── /rss.xml
```

---

未来：

```text
├── /topics
├── /books
├── /projects
├── /ask
```

---

# 8. URL 原则

## Permanent URL

发布后：

> URL 永不轻易变化。

---

推荐：

```text
/writing/article-name

/notes/note-name
```

避免：

```text
/blog/2026/08/article-name
```

因为时间属于内容，不属于路径。

---

# 9. Design System Direction

关键词：

```text
Quiet
Editorial
Personal
Timeless
Bilingual
Content-first
```

---

## Typography

目标：

中英文混排自然。

---

设计变量：

```text
Display Font

Body Font

CJK Font

Code Font

Line Height

Content Width

Spacing Scale
```

---

原则：

> 排版优先于装饰。

---

# 10. Technical Architecture

## Architecture Goal

```text
Low Complexity

+

High Quality

+

Long Lifetime
```

---

## Technology Baseline

| Layer     | Technology               |
| --------- | ------------------------ |
| Domain    | Cloudflare Registrar     |
| DNS       | Cloudflare DNS           |
| Security  | DNSSEC                   |
| Frontend  | Astro                    |
| Language  | TypeScript               |
| Content   | Markdown / MDX           |
| Styling   | Native CSS               |
| Hosting   | Cloudflare Workers       |
| CI/CD     | GitHub Actions           |
| Analytics | Cloudflare Web Analytics |
| Email     | Cloudflare Email Routing |

---

# 11. Architecture Model

```text
GitHub

   |

Source + Content

   |

Build Pipeline

   |

Cloudflare Workers

   |

elliott.page
```

---

# 12. Why Astro

选择 Astro：

不是因为流行。

而是因为：

| Requirement    | Astro     |
| -------------- | --------- |
| Static Content | Excellent |
| Markdown       | Native    |
| Performance    | Excellent |
| Migration      | Easy      |
| Low JS         | Excellent |

---

# 13. Anti Goals

明确不做：

---

## 不做复杂 CMS

避免：

- WordPress
- Database CMS
- Admin Panel

---

## 不做社交平台功能

避免：

- Comments
- Likes
- Followers

---

## 不做 SPA

避免：

- Large JS Runtime
- Client State
- Complex Frontend Architecture

---

# 14. AI-Native Future

## Personal Knowledge Layer

未来：

```text
Content

 ↓

Index

 ↓

Embedding

 ↓

Knowledge Base

 ↓

AI Assistant
```

---

可能能力：

- Semantic Search
- Personal Q&A
- Writing Assistant
- Knowledge Discovery

---

入口：

未来考虑：

```text
/ask
```

而不是首页 AI Chat。

---

# 15. Content Provenance

AI 时代，内容必须保留来源。

每篇内容：

```yaml
---
title:
created:
updated:
tags:
status:
---
```

未来可扩展：

```yaml
references:
inspired_by:
related:
```

---

# 16. Operations Model

不是传统网站运营。

核心：

## Publishing Practice

包括：

- 写作；
- 编辑；
- 发布；
- 更新。

基础设施：

Cloudflare 自动承担。

---

# 17. Roadmap

---

# v1 Foundation

目标：

建立空间。

包含：

- Cloudflare 完整配置；
- Astro 基础；
- Design System；
- Writing；
- Notes；
- About；
- Now；
- RSS。

---

# v1.5 Digital Garden

目标：

内容生态。

增加：

- Topics；
- Related Notes；
- Backlinks；
- 内容关系。

---

# v2 AI Native

目标：

个人知识接口。

增加：

- Semantic Search；
- RAG；
- `/ask`;
- Personal AI。

---

# 18. Success Criteria

不是：

- PV；
- SEO；
- Followers。

---

真正成功：

## 五年后

我仍愿意打开它。

---

## 十年后

内容仍属于我。

---

## 二十年后

它记录了一个真实的人。

---

# Final Definition

> **Elliott.page is not a blog.**
>
> **It is a personal digital habitat.**
>
> A quiet, durable, owned space where Elliott Bai’s writing, ideas, experiences, and knowledge accumulate over time.
>
> Technology exists to preserve expression.
>
> AI exists to amplify understanding.
>
> The human remains the center.

---

**Elliott.page v1.1 North Star：**

> 建立一个属于自己的、可以陪伴几十年的互联网空间。
> 不追逐流量，不依附平台，让思想和作品随着时间自然生长。
