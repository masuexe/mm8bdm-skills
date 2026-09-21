# MM8BDM Skills

[English](README.md) | **简体中文**

跨项目 Cursor / Agent Skills：Zandronum 正确写法 + MM8BDM 官方模组文档快照。

| Skill | 用途 |
|-------|------|
| [zandronum-modding](zandronum-modding/) | DECORATE/ACS 引擎陷阱、lump 命名、无 ZScript |
| [mm8bdm-modding](mm8bdm-modding/) | `core_*`、ClassBase、DTADD/BARLIB、wiki 教程（打在 `references/`） |

符合 [Agent Skills](https://agentskills.io/specification)：**知识跟 skill 走**，运行时不依赖本机 wiki 仓库路径。

## 安装

### 推荐：skills CLI（Cursor）

在终端直接运行：

```bash
npx skills add masuexe/mm8bdm-skills --skill mm8bdm-modding --skill zandronum-modding -a cursor -g
```

或者从本地克隆路径安装（用于本地开发或调试）：

```powershell
npx skills add "D:\path\to\mm8bdm-skills" --skill mm8bdm-modding --skill zandronum-modding -a cursor -g
```

把上面的路径换成你机器上的 clone 路径（不要写死盘符进 skill 正文）。

### 备选：Junction（Windows）

```powershell
$src = "<path-to-cloned-mm8bdm-skills>"
$dst = "$env:USERPROFILE\.cursor\skills"
New-Item -ItemType Directory -Force -Path $dst | Out-Null
cmd /c mklink /J "$dst\zandronum-modding" "$src\zandronum-modding"
cmd /c mklink /J "$dst\mm8bdm-modding" "$src\mm8bdm-modding"
```

不要装到 `~\.cursor\skills-cursor\`（Cursor 内置 skill 目录）。

换机：重新 `npx skills add` 或重新 junction。wiki 快照已在 `mm8bdm-modding/references/`，**不必**再带 exporter。

## 维护：更新 wiki 快照

从本机英文 wiki 导出同步模组分区（不含玩家向页、不含 `assets/`）：

```bash
node mm8bdm-modding/scripts/sync-wiki.mjs [wiki-output-root]
```

省略参数时，脚本用特征文件在附近目录搜索英文导出（不依赖 `MM8BDM-Wiki-Exporter` 等目录名）。也可设环境变量 `MM8BDM_WIKI`。同步后提交 `references/` 变更。

## 与各模组 AGENTS.md 的关系

- **Skill**：跨仓库复用的引擎陷阱 + MM8BDM API/教程。
- **AGENTS.md**：留在具体仓库（身份、目录、UH 命名、`ref/` 等项目私有内容）。

写 DECORATE/ACS 时两套 skill 会按 description 自动参与；引擎细节见 `zandronum-modding`，MM8BDM API 见 `mm8bdm-modding`。

## 致谢与来源声明（Credits & Attribution）

本项目凝聚了 MM8BDM 与 Zandronum 模组社区多年积累的集体智慧：

- **MM8BDM 官方 Wiki**：`mm8bdm-modding/references/` 中的文档快照来自 [MM8BDM 官方 Notion Wiki](https://mm8bdm.notion.site/)，由 Trillster 及社区贡献者编撰。
- **武器发布核查清单（Checklist）**：参考并改编自 **StardustMotion** 的 [Ultimate New Weapon Checklist (v6b)](https://gist.github.com/StardustMotion/278531046b736b84f637fbfeaba830e6)。
- **Zandronum 引擎陷阱与特性**：`zandronum-modding/` 中汇总的引擎细节很大程度上受益于 MM8BDM.net 论坛的 [Zandronum Quirks 讨论帖](https://mm8bdm.net/forum/thread/zandronum-quirks-thread-191) 以及社区深入研究成果。
- **Mega Man 8-Bit Deathmatch**：由 CutmanMike 及 MM8BDM 开发团队制作。

## 免责声明（Disclaimer）

- 《洛克人》（Mega Man / Rockman）及其相关角色、名称、音画资源之版权均归属于 Capcom（卡普空）所有。
- 《Mega Man 8-Bit Deathmatch》是一款非商业性质的同人游戏。
- 本仓库为面向 AI 辅助编程与模组开发的非官方社区工具，与 Capcom 以及 MM8BDM 官方团队无任何商业关联或官方背书。
