---
title: "Map Changes with Map Voting"
notion_id: ae851ac5de074866b18107ca32afdb74
source: https://www.notion.so/ae851ac5de074866b18107ca32afdb74
---

# Map Changes with Map Voting

---

[Map Voting](https://mm8bdm.net/forum/thread/map-voting-126) is an unofficial quality of life addon which allows players to vote on the next map.

![image](https://trillster.dev/images/example%20(1).png)

Because some custom game modes may need to manually change the map due to unique win conditions, Map Voting provides a means of checking when it is loaded and a script to call when wanting to change the map and still abide by the players’ votes.

## Checking for Map Voting

---

Map Voting implements a uniquely named actor called `MapVoting_Loaded` which allows the standard trick of using the return value of [`SpawnForced`](https://zdoom.org/wiki/SpawnForced) as a means to check for another file being loaded.

This allows us to create a very easy function to return whether or not Map Voting is loaded.

```javascript
function bool isMapVotingLoaded (void) {
	return SpawnForced("MapVoting_Loaded", 0, 0, 0, 0, 0);
}
```

## Handling Map Voting

---

In the situation that Map Voting is loaded, a `mapvote_changemap` script is provided that you can execute in lieu of [`Exit_Normal`](https://zdoom.org/wiki/Exit_Normal) or `ConsoleCommand("nextmap")`. Below is an example of how these pieces together may all look in a script called by Rage Roboenza when one team wins and the round is over.

```javascript
function bool isMapVotingLoaded (void) {
	return SpawnForced("MapVoting_Loaded", 0, 0, 0, 0, 0);
}

script "ragerobo_roundend" (void) {
	if(isMapVotingLoaded()) {
		ACS_NamedExecuteWithResult("mapvote_changemap");
	} else {
		Exit_Normal(0);
	}
}
```
