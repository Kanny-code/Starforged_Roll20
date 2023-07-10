//
// These scripts generate handouts for NPCs.
//

//
// Type ! activate this script type !BecomeStarForged into your games chat to generate all the rollable tables and macros needed.
//

// This script creates a Handout for a Blank NPC with only the name generated.

on("chat:message", function(msg) {
    if (msg.type === "api" && msg.content === "!createNPCHandout") {
        createNPCHandout();
    }
});

function createNPCHandout() {
    var givenName = getRandomItemFromTableBLNPC("NPC-Given-Names");
    var familyName = getRandomItemFromTableBLNPC("NPC-Family-Names");

    var characterName = `${givenName} ${familyName}`;

    var handout = createObj("handout", {
        name: `NPC: ${characterName}`,
        inplayerjournals: "all"
    });

    var content = `<b>Character Name:</b> ${characterName}<br>` +
                  `<br>` +
                  `<b>Callsign:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<b>Role:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<b>Location:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>First Look:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<b>Initial Disposition:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Goal:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<b>Revealed Character Aspects:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Notes:</b></b>&nbsp;<br>`;

    handout.set("notes", content);
}

function getRandomItemFromTableBLNPC(tableName) {
    var table = findObjs({
        type: "rollabletable",
        name: tableName
    })[0];

    if (!table) {
        sendChat("API", `/w gm Unable to locate a rollable table called ${tableName}`);
        return "";
    }

    var tableItems = findObjs({
        type: "tableitem",
        rollabletableid: table.get("id")
    });

    if (tableItems.length === 0) {
        sendChat("API", `/w gm ${tableName} has no items.`);
        return "";
    }

    var randomIndex = randomInteger(tableItems.length) - 1;
    return tableItems[randomIndex].get("name");
}

// This script creates a Handout for a Full NPC with all their information generated.

on("chat:message", function(msg) {
    if (msg.type === "api" && msg.content === "!createFullNPCHandout") {
        createFullNPCHandout();
    }
});

function createFullNPCHandout() {
    var givenName = getRandomItemFromTableFULLNPC("NPC-Given-Names");
    var familyName = getRandomItemFromTableFULLNPC("NPC-Family-Names");
    var callsign = getRandomItemFromTableFULLNPC("NPC-Callsign");
    var role = handleSpecialCasesFULLNPC(getRandomItemFromTableFULLNPC("NPC-Role"), "NPC-Role");
    var firstLook = getRandomItemFromTableFULLNPC("NPC-First-Look");
    var initialDisposition = getRandomItemFromTableFULLNPC("NPC-Initial-Disposition");
    var goal = handleSpecialCasesFULLNPC(getRandomItemFromTableFULLNPC("NPC-Goal"), "NPC-Goal");
    var revealedCharacterAspects = getRandomItemFromTableFULLNPC("NPC-Revealed-Character-Aspect");

    var characterName = `${givenName} ${familyName}`;

    var handout = createObj("handout", {
        name: `NPC: ${characterName}`,
        inplayerjournals: "all"
    });

    var content = `<b>Character Name:</b> ${characterName}<br>` +
                  `<br>` +
                  `<b>Callsign:</b> ${callsign}<br>` +
                  `<br>` +
                  `<b>Role:</b> ${role}<br>` +
                  `<br>` +
                  `<b>Location:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>First Look:</b> ${firstLook}<br>` +
                  `<br>` +
                  `<b>Initial Disposition:</b> ${initialDisposition}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Goal:</b> ${goal}<br>` +
                  `<br>` +
                  `<b>Revealed Character Aspects:</b> ${revealedCharacterAspects}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Notes:</b></b>&nbsp;<br>`;

    handout.set("notes", content);
}

function handleSpecialCasesFULLNPC(item, tableName) {
    if (item === "Action + Theme") {
        var action = getRandomItemFromTableFULLNPC("Core-Action");
        var theme = getRandomItemFromTableFULLNPC("Core-Theme");
        return `${action} + ${theme}`;
    } else if (item === "Roll twice") {
        var firstRoll = getRandomItemFromTableFULLNPC(tableName);
        var secondRoll = getRandomItemFromTableFULLNPC(tableName);
        return `${handleSpecialCasesFULLNPC(firstRoll, tableName)} + ${handleSpecialCasesFULLNPC(secondRoll, tableName)}`;
    } else {
        return item;
    }
}

function getRandomItemFromTableFULLNPC(tableName) {
    var table = findObjs({
        type: "rollabletable",
        name: tableName
    })[0];

    if (!table) {
        sendChat("API", `/w gm Unable to locate a rollable table called ${tableName}`);
        return "";
    }

    var tableItems = findObjs({
        type: "tableitem",
        rollabletableid: table.get("id")
    });

    if (tableItems.length === 0) {
        sendChat("API", `/w gm ${tableName} has no items.`);
        return "";
    }

    var randomIndex = randomInteger(tableItems.length) - 1;
    return tableItems[randomIndex].get("name");
}

//
// These scripts generate handouts for Planets.
//

// This script creates a Handout for a Blank Planet with only the name generated.

on("chat:message", function(msg) {
    if (msg.type === "api" && msg.content === "!createPlanetHandout") {
        createPlanetHandout();
    }
});

function createPlanetHandout() {
    var part1 = randomInteger(100) <= 20 ? getRandomItemFromTableBL("Planet-Names-1") : "";
    var part2 = getRandomItemFromTableBL("Planet-Names-2");
    var part3 = randomInteger(100) <= 20 ? getRandomItemFromTableBL("Planet-Names-3") : "";

    var planetName = `Planet: ${(part1 + " " + part2 + " " + part3).trim()}`;

    var handout = createObj("handout", {
        name: planetName,
        inplayerjournals: "all"
    });

    var content = `<b>Planet Name:</b> ${(part1 + " " + part2 + " " + part3).trim()}<br>` +
                  `<br>` +
                  `<b>Planetary Class:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<b>Sector:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Observed From Space:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<b>Atmosphere:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Planetside Features:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<b>Life:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<b>Settlement Types:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Notes:</b></b>&nbsp;<br>` ;

    handout.set("notes", content);
}

function getRandomItemFromTableBL(tableName) {
    var table = findObjs({
        type: "rollabletable",
        name: tableName
    })[0];

    if (!table) {
        sendChat("API", `/w gm Unable to locate a rollable table called ${tableName}`);
        return "";
    }

    var tableItems = findObjs({
        type: "tableitem",
        rollabletableid: table.get("id")
    });

    if (tableItems.length === 0) {
        sendChat("API", `/w gm ${tableName} has no items.`);
        return "";
    }

    var randomIndex = randomInteger(tableItems.length) - 1;
    return tableItems[randomIndex].get("name");
}

// This script creates a Handout for a Planet from the Terminus Region

on("chat:message", function(msg) {
    if (msg.type === "api" && msg.content === "!createFullTPlanetHandout") {
        createFullTPlanetHandout();
    }
});

function createFullTPlanetHandout() {
    var part1 = randomInteger(100) <= 20 ? getRandomItemFromTablePT("Planet-Names-1") : "";
    var part2 = getRandomItemFromTablePT("Planet-Names-2");
    var part3 = randomInteger(100) <= 20 ? getRandomItemFromTablePT("Planet-Names-3") : "";

    var planetName = `Planet: ${(part1 + " " + part2 + " " + part3).trim()}`;

    var planetaryClassResult = replaceDescriptorPTFocus(getRandomItemFromTablePT("Planet-Class"));

    var planetaryClassMap = {
        "Desert World (A pitiless planet of searing heat, blowing sand, and sunbaked rock.)": "Desert",
        "Furnace World (A planet with relentless volcanic activity, wreathed in fire and ash.)": "Furnace",
        "Grave World (A once-thriving world—now a grim monument to a fallen civilization.)": "Grave",
        "Ice World (A rugged, frozen world—locked in an unending winter.)": "Ice",
        "Jovian World (A massive planet with vast layers of dense gases surrounding a small rocky core.)": "Jovian",
        "Jungle World (A humid, rain-soaked planet which keeps its secrets under a thick canopy of vegetation.)": "Jungle",
        "Ocean World (A planet completely or mostly covered by a boundless ocean.)": "Ocean",
        "Rocky World (A rugged planet scarred by eons of destructive asteroid impacts.)": "Rocky",
        "Shattered World (A planet sundered by cataclysmic destruction.)": "Shattered",
        "Tainted World (A foul planet wracked by a poisonous climate and virulent growths.)": "Tainted",
        "Vital World (This diverse, life-bearing planet might provide some small measure of hope.)": "Vital"
    };

    var planetaryClassShort = planetaryClassMap[planetaryClassResult];

    var observedFromSpace = replaceDescriptorPTFocus(getRandomItemFromTablePT(`Planet-${planetaryClassShort}-World-From-Space`));
    var atmosphere = replaceDescriptorPTFocus(getRandomItemFromTablePT(`Planet-${planetaryClassShort}-World-Atmosphere`));
    var planetsideFeatures = replaceDescriptorPTFocus(getRandomItemFromTablePT(`Planet-${planetaryClassShort}-World-Planetside-Feature`));
    var life = replaceDescriptorPTFocus(getRandomItemFromTablePT(`Planet-${planetaryClassShort}-World-Life`));
    var settlements = replaceDescriptorPTFocus(getRandomItemFromTablePT(`Planet-${planetaryClassShort}-World-Settlements-Terminus`));

    var handout = createObj("handout", {
        name: planetName,
        inplayerjournals: "all"
    });

    var content = `<b>Planet Name:</b> ${(part1 + " " + part2 + " " + part3).trim()}<br>` +
                  `<br>` +
                  `<b>Planetary Class:</b> ${planetaryClassResult}<br>` +
                  `<br>` +
                  `<b>Sector:</b> Terminus <br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Observed From Space:</b> ${observedFromSpace}<br>` +
                  `<br>` +
                  `<b>Atmosphere:</b> ${atmosphere}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Planetside Features:</b> ${planetsideFeatures}<br>` +
                  `<br>` +
                  `<b>Life:</b> ${life}<br>` +
                  `<br>` +
                  `<b>Settlement Types:</b> ${settlements}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Notes:</b></b>&nbsp;<br>` ;

    handout.set("notes", content);
}

function getRandomItemFromTablePT(tableName) {
    var table = findObjs({
        type: "rollabletable",
        name: tableName
    })[0];

    if (!table) {
        sendChat("API", `/w gm Unable to locate a rollable table called ${tableName}`);
        return "";
    }

    var tableItems = findObjs({
        type: "tableitem",
        rollabletableid: table.get("id")
    });

    if (tableItems.length === 0) {
        sendChat("API", `/w gm ${tableName} has no items.`);
        return "";
    }

    var randomIndex = randomInteger(tableItems.length) - 1;
    return tableItems[randomIndex].get("name");
}

function replaceDescriptorPTFocus(result) {
    if (result === "Descriptor + Focus") {
        var descriptor = getRandomItemFromTablePT("Core-Descriptor");
        var focus = getRandomItemFromTablePT("Core-Focus");
        return descriptor + " + " + focus;
    }
    return result;
}

// This script creates a Handout for a Planet from the Outlands Region

on("chat:message", function(msg) {
    if (msg.type === "api" && msg.content === "!createFullOPlanetHandout") {
        createFullOPlanetHandout();
    }
});

function createFullOPlanetHandout() {
    var part1 = randomInteger(100) <= 20 ? getRandomItemFromTablePO("Planet-Names-1") : "";
    var part2 = getRandomItemFromTablePO("Planet-Names-2");
    var part3 = randomInteger(100) <= 20 ? getRandomItemFromTablePO("Planet-Names-3") : "";

    var planetName = `Planet: ${(part1 + " " + part2 + " " + part3).trim()}`;

    var planetaryClassResult = replaceDescriptorPOFocus(getRandomItemFromTablePO("Planet-Class"));

    var planetaryClassMap = {
        "Desert World (A pitiless planet of searing heat, blowing sand, and sunbaked rock.)": "Desert",
        "Furnace World (A planet with relentless volcanic activity, wreathed in fire and ash.)": "Furnace",
        "Grave World (A once-thriving world—now a grim monument to a fallen civilization.)": "Grave",
        "Ice World (A rugged, frozen world—locked in an unending winter.)": "Ice",
        "Jovian World (A massive planet with vast layers of dense gases surrounding a small rocky core.)": "Jovian",
        "Jungle World (A humid, rain-soaked planet which keeps its secrets under a thick canopy of vegetation.)": "Jungle",
        "Ocean World (A planet completely or mostly covered by a boundless ocean.)": "Ocean",
        "Rocky World (A rugged planet scarred by eons of destructive asteroid impacts.)": "Rocky",
        "Shattered World (A planet sundered by cataclysmic destruction.)": "Shattered",
        "Tainted World (A foul planet wracked by a poisonous climate and virulent growths.)": "Tainted",
        "Vital World (This diverse, life-bearing planet might provide some small measure of hope.)": "Vital"
    };

    var planetaryClassShort = planetaryClassMap[planetaryClassResult];

    var observedFromSpace = replaceDescriptorPOFocus(getRandomItemFromTablePO(`Planet-${planetaryClassShort}-World-From-Space`));
    var atmosphere = replaceDescriptorPOFocus(getRandomItemFromTablePO(`Planet-${planetaryClassShort}-World-Atmosphere`));
    var planetsideFeatures = replaceDescriptorPOFocus(getRandomItemFromTablePO(`Planet-${planetaryClassShort}-World-Planetside-Feature`));
    var life = replaceDescriptorPOFocus(getRandomItemFromTablePO(`Planet-${planetaryClassShort}-World-Life`));
    var settlements = replaceDescriptorPOFocus(getRandomItemFromTablePO(`Planet-${planetaryClassShort}-World-Settlements-Outlands`));

    var handout = createObj("handout", {
        name: planetName,
        inplayerjournals: "all"
    });

    var content = `<b>Planet Name:</b> ${(part1 + " " + part2 + " " + part3).trim()}<br>` +
                  `<br>` +
                  `<b>Planetary Class:</b> ${planetaryClassResult}<br>` +
                  `<br>` +
                  `<b>Sector:</b> Outlands <br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Observed From Space:</b> ${observedFromSpace}<br>` +
                  `<br>` +
                  `<b>Atmosphere:</b> ${atmosphere}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Planetside Features:</b> ${planetsideFeatures}<br>` +
                  `<br>` +
                  `<b>Life:</b> ${life}<br>` +
                  `<br>` +
                  `<b>Settlement Types:</b> ${settlements}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Notes:</b></b>&nbsp;<br>` ;

    handout.set("notes", content);
}

function getRandomItemFromTablePO(tableName) {
    var table = findObjs({
        type: "rollabletable",
        name: tableName
    })[0];

    if (!table) {
        sendChat("API", `/w gm Unable to locate a rollable table called ${tableName}`);
        return "";
    }

    var tableItems = findObjs({
        type: "tableitem",
        rollabletableid: table.get("id")
    });

    if (tableItems.length === 0) {
        sendChat("API", `/w gm ${tableName} has no items.`);
        return "";
    }

    var randomIndex = randomInteger(tableItems.length) - 1;
    return tableItems[randomIndex].get("name");
}

function replaceDescriptorPOFocus(result) {
    if (result === "Descriptor + Focus") {
        var descriptor = getRandomItemFromTablePO("Core-Descriptor");
        var focus = getRandomItemFromTablePO("Core-Focus");
        return descriptor + " + " + focus;
    }
    return result;
}

// This script creates a Handout for a Planet from the Expanse Region

on("chat:message", function(msg) {
    if (msg.type === "api" && msg.content === "!createFullEPlanetHandout") {
        createFullEPlanetHandout();
    }
});

function createFullEPlanetHandout() {
    var part1 = randomInteger(100) <= 20 ? getRandomItemFromTablePE("Planet-Names-1") : "";
    var part2 = getRandomItemFromTablePE("Planet-Names-2");
    var part3 = randomInteger(100) <= 20 ? getRandomItemFromTablePE("Planet-Names-3") : "";

    var planetName = `Planet: ${(part1 + " " + part2 + " " + part3).trim()}`;

    var planetaryClassResult = replaceDescriptorPEFocus(getRandomItemFromTablePE("Planet-Class"));

    var planetaryClassMap = {
        "Desert World (A pitiless planet of searing heat, blowing sand, and sunbaked rock.)": "Desert",
        "Furnace World (A planet with relentless volcanic activity, wreathed in fire and ash.)": "Furnace",
        "Grave World (A once-thriving world—now a grim monument to a fallen civilization.)": "Grave",
        "Ice World (A rugged, frozen world—locked in an unending winter.)": "Ice",
        "Jovian World (A massive planet with vast layers of dense gases surrounding a small rocky core.)": "Jovian",
        "Jungle World (A humid, rain-soaked planet which keeps its secrets under a thick canopy of vegetation.)": "Jungle",
        "Ocean World (A planet completely or mostly covered by a boundless ocean.)": "Ocean",
        "Rocky World (A rugged planet scarred by eons of destructive asteroid impacts.)": "Rocky",
        "Shattered World (A planet sundered by cataclysmic destruction.)": "Shattered",
        "Tainted World (A foul planet wracked by a poisonous climate and virulent growths.)": "Tainted",
        "Vital World (This diverse, life-bearing planet might provide some small measure of hope.)": "Vital"
    };

    var planetaryClassShort = planetaryClassMap[planetaryClassResult];

    var observedFromSpace = replaceDescriptorPEFocus(getRandomItemFromTablePE(`Planet-${planetaryClassShort}-World-From-Space`));
    var atmosphere = replaceDescriptorPEFocus(getRandomItemFromTablePE(`Planet-${planetaryClassShort}-World-Atmosphere`));
    var planetsideFeatures = replaceDescriptorPEFocus(getRandomItemFromTablePE(`Planet-${planetaryClassShort}-World-Planetside-Feature`));
    var life = replaceDescriptorPEFocus(getRandomItemFromTablePE(`Planet-${planetaryClassShort}-World-Life`));
    var settlements = replaceDescriptorPEFocus(getRandomItemFromTablePE(`Planet-${planetaryClassShort}-World-Settlements-Expanse`));

    var handout = createObj("handout", {
        name: planetName,
        inplayerjournals: "all"
    });

    var content = `<b>Planet Name:</b> ${(part1 + " " + part2 + " " + part3).trim()}<br>` +
                  `<br>` +
                  `<b>Planetary Class:</b> ${planetaryClassResult}<br>` +
                  `<br>` +
                  `<b>Sector:</b> Expanse <br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Observed From Space:</b> ${observedFromSpace}<br>` +
                  `<br>` +
                  `<b>Atmosphere:</b> ${atmosphere}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Planetside Features:</b> ${planetsideFeatures}<br>` +
                  `<br>` +
                  `<b>Life:</b> ${life}<br>` +
                  `<br>` +
                  `<b>Settlement Types:</b> ${settlements}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Notes:</b></b>&nbsp;<br>` ;

    handout.set("notes", content);
}

function getRandomItemFromTablePE(tableName) {
    var table = findObjs({
        type: "rollabletable",
        name: tableName
    })[0];

    if (!table) {
        sendChat("API", `/w gm Unable to locate a rollable table called ${tableName}`);
        return "";
    }

    var tableItems = findObjs({
        type: "tableitem",
        rollabletableid: table.get("id")
    });

    if (tableItems.length === 0) {
        sendChat("API", `/w gm ${tableName} has no items.`);
        return "";
    }

    var randomIndex = randomInteger(tableItems.length) - 1;
    return tableItems[randomIndex].get("name");
}

function replaceDescriptorPEFocus(result) {
    if (result === "Descriptor + Focus") {
        var descriptor = getRandomItemFromTablePE("Core-Descriptor");
        var focus = getRandomItemFromTablePE("Core-Focus");
        return descriptor + " + " + focus;
    }
    return result;
}

//
// These scripts generate handouts for Settlements.
//

// This script creates a Handout for a Planetside Settlement in the Terminus region.

on("chat:message", function(msg) {
    if (msg.type === "api" && msg.content === "!createSettlementPTHandout") {
        createSettlementPTHandout();
    }
});

function createSettlementPTHandout() {
    var settlementName = replaceSpecialResultsSETPT(getRandomItemFromTableSETPT("Settlement-Name"), "Settlement-Name");

    var handoutName = `Settlement: ${settlementName}`;

    var population = replaceSpecialResultsSETPT(getRandomItemFromTableSETPT("Settlement-Population-Terminus"), "Settlement-Population-Terminus");
    var firstLook = replaceSpecialResultsSETPT(getRandomItemFromTableSETPT("Settlement-First-Look"), "Settlement-First-Look");
    var initialContact = replaceSpecialResultsSETPT(getRandomItemFromTableSETPT("Settlement-Initial-Contact"), "Settlement-Initial-Contact");
    var authority = replaceSpecialResultsSETPT(getRandomItemFromTableSETPT("Settlement-Authority"), "Settlement-Authority");
    var projects = replaceSpecialResultsSETPT(getRandomItemFromTableSETPT("Settlement-Projects"), "Settlement-Projects");
    var troubles = replaceSpecialResultsSETPT(getRandomItemFromTableSETPT("Settlement-Trouble"), "Settlement-Trouble");

    var handout = createObj("handout", {
        name: handoutName,
        inplayerjournals: "all"
    });

    var content = `<b>Settlement Name:</b> ${settlementName}<br>` +
                  `<br>` +
                  `<b>Region:</b> Terminus<br>` +
                  `<br>` +
                  `<b>Planet:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<b>Location:</b> Planetside<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Population:</b> ${population}<br>` +
                  `<br>` +
                  `<b>Authority:</b> ${authority}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>First Look:</b> ${firstLook}<br>` +
                  `<br>` +
                  `<b>Initial contact:</b> ${initialContact}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Projects:</b> ${projects}<br>` +
                  `<br>` +
                  `<b>Troubles:</b> ${troubles}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Notes:</b></b>&nbsp;<br>`;

    handout.set("notes", content);
}

function getRandomItemFromTableSETPT(tableName) {
    var table = findObjs({
        type: "rollabletable",
        name: tableName
    })[0];

    if (!table) {
        sendChat("API", `/w gm Unable to locate a rollable table called ${tableName}`);
        return "";
    }

    var tableItems = findObjs({
        type: "tableitem",
        rollabletableid: table.get("id")
    });

    if (tableItems.length === 0) {
        sendChat("API", `/w gm ${tableName} has no items.`);
        return "";
    }

    var randomIndex = randomInteger(tableItems.length) - 1;
    return tableItems[randomIndex].get("name");
}

function replaceSpecialResultsSETPT(result, tableName) {
    if (result === "Descriptor + Focus") {
        var descriptor = getRandomItemFromTableSETPT("Core-Descriptor");
        var focus = getRandomItemFromTableSETPT("Core-Focus");
        return descriptor + " + " + focus;
    }
    if (result === "Action + Theme") {
        var action = getRandomItemFromTableSETPT("Core-Action");
        var theme = getRandomItemFromTableSETPT("Core-Theme");
        return action + " + " + theme;
    }
    if (result === "Roll twice") {
        var firstResult = getFinalResultFromTableSETPT(tableName);
        var secondResult = getFinalResultFromTableSETPT(tableName);
        return firstResult + " + " + secondResult;
    }
    return result;
}

function getFinalResultFromTableSETPT(tableName) {
    var result;
    do {
        result = getRandomItemFromTableSETPT(tableName);
    } while (result === "Roll twice" || result === "Action + Theme" || result === "Descriptor + Focus");
    return replaceSpecialResultsSETPT(result, tableName);
}

// This script creates a Handout for a Planetside Settlement in the Outlands region.

on("chat:message", function(msg) {
    if (msg.type === "api" && msg.content === "!createSettlementPOHandout") {
        createSettlementPOHandout();
    }
});

function createSettlementPOHandout() {
    var settlementName = replaceSpecialResultsSETPO(getRandomItemFromTableSETPO("Settlement-Name"), "Settlement-Name");

    var handoutName = `Settlement: ${settlementName}`;

    var population = replaceSpecialResultsSETPO(getRandomItemFromTableSETPO("Settlement-Population-Outlands"), "Settlement-Population-Outlands");
    var firstLook = replaceSpecialResultsSETPO(getRandomItemFromTableSETPO("Settlement-First-Look"), "Settlement-First-Look");
    var initialContact = replaceSpecialResultsSETPO(getRandomItemFromTableSETPO("Settlement-Initial-Contact"), "Settlement-Initial-Contact");
    var authority = replaceSpecialResultsSETPO(getRandomItemFromTableSETPO("Settlement-Authority"), "Settlement-Authority");
    var projects = replaceSpecialResultsSETPO(getRandomItemFromTableSETPO("Settlement-Projects"), "Settlement-Projects");
    var troubles = replaceSpecialResultsSETPO(getRandomItemFromTableSETPO("Settlement-Trouble"), "Settlement-Trouble");

    var handout = createObj("handout", {
        name: handoutName,
        inplayerjournals: "all"
    });

    var content = `<b>Settlement Name:</b> ${settlementName}<br>` +
                  `<br>` +
                  `<b>Region:</b> Outlands<br>` +
                  `<br>` +
                  `<b>Planet:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<b>Location:</b> Planetside<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Population:</b> ${population}<br>` +
                  `<br>` +
                  `<b>Authority:</b> ${authority}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>First Look:</b> ${firstLook}<br>` +
                  `<br>` +
                  `<b>Initial contact:</b> ${initialContact}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Projects:</b> ${projects}<br>` +
                  `<br>` +
                  `<b>Troubles:</b> ${troubles}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Notes:</b></b>&nbsp;<br>`;

    handout.set("notes", content);
}

function getRandomItemFromTableSETPO(tableName) {
    var table = findObjs({
        type: "rollabletable",
        name: tableName
    })[0];

    if (!table) {
        sendChat("API", `/w gm Unable to locate a rollable table called ${tableName}`);
        return "";
    }

    var tableItems = findObjs({
        type: "tableitem",
        rollabletableid: table.get("id")
    });

    if (tableItems.length === 0) {
        sendChat("API", `/w gm ${tableName} has no items.`);
        return "";
    }

    var randomIndex = randomInteger(tableItems.length) - 1;
    return tableItems[randomIndex].get("name");
}

function replaceSpecialResultsSETPO(result, tableName) {
    if (result === "Descriptor + Focus") {
        var descriptor = getRandomItemFromTableSETPO("Core-Descriptor");
        var focus = getRandomItemFromTableSETPO("Core-Focus");
        return descriptor + " + " + focus;
    }
    if (result === "Action + Theme") {
        var action = getRandomItemFromTableSETPO("Core-Action");
        var theme = getRandomItemFromTableSETPO("Core-Theme");
        return action + " + " + theme;
    }
    if (result === "Roll twice") {
        var firstResult = getFinalResultFromTableSETPO(tableName);
        var secondResult = getFinalResultFromTableSETPO(tableName);
        return firstResult + " + " + secondResult;
    }
    return result;
}

function getFinalResultFromTableSETPO(tableName) {
    var result;
    do {
        result = getRandomItemFromTableSETPO(tableName);
    } while (result === "Roll twice" || result === "Action + Theme" || result === "Descriptor + Focus");
    return replaceSpecialResultsSETPO(result, tableName);
}

// This script creates a Handout for a Planetside Settlement in the Expanse region.

on("chat:message", function(msg) {
    if (msg.type === "api" && msg.content === "!createSettlementPEHandout") {
        createSettlementPEHandout();
    }
});

function createSettlementPEHandout() {
    var settlementName = replaceSpecialResultsSETPE(getRandomItemFromTableSETPE("Settlement-Name"), "Settlement-Name");

    var handoutName = `Settlement: ${settlementName}`;

    var population = replaceSpecialResultsSETPE(getRandomItemFromTableSETPE("Settlement-Population-Expanse"), "Settlement-Population-Expanse");
    var firstLook = replaceSpecialResultsSETPE(getRandomItemFromTableSETPE("Settlement-First-Look"), "Settlement-First-Look");
    var initialContact = replaceSpecialResultsSETPE(getRandomItemFromTableSETPE("Settlement-Initial-Contact"), "Settlement-Initial-Contact");
    var authority = replaceSpecialResultsSETPE(getRandomItemFromTableSETPE("Settlement-Authority"), "Settlement-Authority");
    var projects = replaceSpecialResultsSETPE(getRandomItemFromTableSETPE("Settlement-Projects"), "Settlement-Projects");
    var troubles = replaceSpecialResultsSETPE(getRandomItemFromTableSETPE("Settlement-Trouble"), "Settlement-Trouble");

    var handout = createObj("handout", {
        name: handoutName,
        inplayerjournals: "all"
    });

    var content = `<b>Settlement Name:</b> ${settlementName}<br>` +
                  `<br>` +
                  `<b>Region:</b> Expanse<br>` +
                  `<br>` +
                  `<b>Planet:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<b>Location:</b> Planetside<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Population:</b> ${population}<br>` +
                  `<br>` +
                  `<b>Authority:</b> ${authority}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>First Look:</b> ${firstLook}<br>` +
                  `<br>` +
                  `<b>Initial contact:</b> ${initialContact}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Projects:</b> ${projects}<br>` +
                  `<br>` +
                  `<b>Troubles:</b> ${troubles}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Notes:</b></b>&nbsp;<br>`;

    handout.set("notes", content);
}

function getRandomItemFromTableSETPE(tableName) {
    var table = findObjs({
        type: "rollabletable",
        name: tableName
    })[0];

    if (!table) {
        sendChat("API", `/w gm Unable to locate a rollable table called ${tableName}`);
        return "";
    }

    var tableItems = findObjs({
        type: "tableitem",
        rollabletableid: table.get("id")
    });

    if (tableItems.length === 0) {
        sendChat("API", `/w gm ${tableName} has no items.`);
        return "";
    }

    var randomIndex = randomInteger(tableItems.length) - 1;
    return tableItems[randomIndex].get("name");
}

function replaceSpecialResultsSETPE(result, tableName) {
    if (result === "Descriptor + Focus") {
        var descriptor = getRandomItemFromTableSETPE("Core-Descriptor");
        var focus = getRandomItemFromTableSETPE("Core-Focus");
        return descriptor + " + " + focus;
    }
    if (result === "Action + Theme") {
        var action = getRandomItemFromTableSETPE("Core-Action");
        var theme = getRandomItemFromTableSETPE("Core-Theme");
        return action + " + " + theme;
    }
    if (result === "Roll twice") {
        var firstResult = getFinalResultFromTableSETPE(tableName);
        var secondResult = getFinalResultFromTableSETPE(tableName);
        return firstResult + " + " + secondResult;
    }
    return result;
}

function getFinalResultFromTableSETPE(tableName) {
    var result;
    do {
        result = getRandomItemFromTableSETPE(tableName);
    } while (result === "Roll twice" || result === "Action + Theme" || result === "Descriptor + Focus");
    return replaceSpecialResultsSETPE(result, tableName);
}

// This script creates a Handout for a Orbital Settlement in the Terminus region.

on("chat:message", function(msg) {
    if (msg.type === "api" && msg.content === "!createSettlementOTHandout") {
        createSettlementOTHandout();
    }
});

function createSettlementOTHandout() {
    var settlementName = replaceSpecialResultsSETOT(getRandomItemFromTableSETOT("Settlement-Name"), "Settlement-Name");

    var handoutName = `Settlement: ${settlementName}`;

    var population = replaceSpecialResultsSETOT(getRandomItemFromTableSETOT("Settlement-Population-Terminus"), "Settlement-Population-Terminus");
    var firstLook = replaceSpecialResultsSETOT(getRandomItemFromTableSETOT("Settlement-First-Look"), "Settlement-First-Look");
    var initialContact = replaceSpecialResultsSETOT(getRandomItemFromTableSETOT("Settlement-Initial-Contact"), "Settlement-Initial-Contact");
    var authority = replaceSpecialResultsSETOT(getRandomItemFromTableSETOT("Settlement-Authority"), "Settlement-Authority");
    var projects = replaceSpecialResultsSETOT(getRandomItemFromTableSETOT("Settlement-Projects"), "Settlement-Projects");
    var troubles = replaceSpecialResultsSETOT(getRandomItemFromTableSETOT("Settlement-Trouble"), "Settlement-Trouble");

    var handout = createObj("handout", {
        name: handoutName,
        inplayerjournals: "all"
    });

    var content = `<b>Settlement Name:</b> ${settlementName}<br>` +
                  `<br>` +
                  `<b>Region:</b> Terminus<br>` +
                  `<br>` +
                  `<b>Planet:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<b>Location:</b> Orbital<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Population:</b> ${population}<br>` +
                  `<br>` +
                  `<b>Authority:</b> ${authority}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>First Look:</b> ${firstLook}<br>` +
                  `<br>` +
                  `<b>Initial contact:</b> ${initialContact}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Projects:</b> ${projects}<br>` +
                  `<br>` +
                  `<b>Troubles:</b> ${troubles}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Notes:</b></b>&nbsp;<br>`;

    handout.set("notes", content);
}

function getRandomItemFromTableSETOT(tableName) {
    var table = findObjs({
        type: "rollabletable",
        name: tableName
    })[0];

    if (!table) {
        sendChat("API", `/w gm Unable to locate a rollable table called ${tableName}`);
        return "";
    }

    var tableItems = findObjs({
        type: "tableitem",
        rollabletableid: table.get("id")
    });

    if (tableItems.length === 0) {
        sendChat("API", `/w gm ${tableName} has no items.`);
        return "";
    }

    var randomIndex = randomInteger(tableItems.length) - 1;
    return tableItems[randomIndex].get("name");
}

function replaceSpecialResultsSETOT(result, tableName) {
    if (result === "Descriptor + Focus") {
        var descriptor = getRandomItemFromTableSETOT("Core-Descriptor");
        var focus = getRandomItemFromTableSETOT("Core-Focus");
        return descriptor + " + " + focus;
    }
    if (result === "Action + Theme") {
        var action = getRandomItemFromTableSETOT("Core-Action");
        var theme = getRandomItemFromTableSETOT("Core-Theme");
        return action + " + " + theme;
    }
    if (result === "Roll twice") {
        var firstResult = getFinalResultFromTableSETOT(tableName);
        var secondResult = getFinalResultFromTableSETOT(tableName);
        return firstResult + " + " + secondResult;
    }
    return result;
}

function getFinalResultFromTableSETOT(tableName) {
    var result;
    do {
        result = getRandomItemFromTableSETOT(tableName);
    } while (result === "Roll twice" || result === "Action + Theme" || result === "Descriptor + Focus");
    return replaceSpecialResults(result, tableName);
}

// This script creates a Handout for a Orbital Settlement in the Outlands region.

on("chat:message", function(msg) {
    if (msg.type === "api" && msg.content === "!createSettlementOOHandout") {
        createSettlementOOHandout();
    }
});

function createSettlementOOHandout() {
    var settlementName = replaceSpecialResultsSETOO(getRandomItemFromTableSETOO("Settlement-Name"), "Settlement-Name");

    var handoutName = `Settlement: ${settlementName}`;

    var population = replaceSpecialResultsSETOO(getRandomItemFromTableSETOO("Settlement-Population-Outlands"), "Settlement-Population-Outlands");
    var firstLook = replaceSpecialResultsSETOO(getRandomItemFromTableSETOO("Settlement-First-Look"), "Settlement-First-Look");
    var initialContact = replaceSpecialResultsSETOO(getRandomItemFromTableSETOO("Settlement-Initial-Contact"), "Settlement-Initial-Contact");
    var authority = replaceSpecialResultsSETOO(getRandomItemFromTableSETOO("Settlement-Authority"), "Settlement-Authority");
    var projects = replaceSpecialResultsSETOO(getRandomItemFromTableSETOO("Settlement-Projects"), "Settlement-Projects");
    var troubles = replaceSpecialResultsSETOO(getRandomItemFromTableSETOO("Settlement-Trouble"), "Settlement-Trouble");

    var handout = createObj("handout", {
        name: handoutName,
        inplayerjournals: "all"
    });

    var content = `<b>Settlement Name:</b> ${settlementName}<br>` +
                  `<br>` +
                  `<b>Region:</b> Outlands<br>` +
                  `<br>` +
                  `<b>Planet:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<b>Location:</b> Orbital<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Population:</b> ${population}<br>` +
                  `<br>` +
                  `<b>Authority:</b> ${authority}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>First Look:</b> ${firstLook}<br>` +
                  `<br>` +
                  `<b>Initial contact:</b> ${initialContact}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Projects:</b> ${projects}<br>` +
                  `<br>` +
                  `<b>Troubles:</b> ${troubles}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Notes:</b></b>&nbsp;<br>`;

    handout.set("notes", content);
}

function getRandomItemFromTableSETOO(tableName) {
    var table = findObjs({
        type: "rollabletable",
        name: tableName
    })[0];

    if (!table) {
        sendChat("API", `/w gm Unable to locate a rollable table called ${tableName}`);
        return "";
    }

    var tableItems = findObjs({
        type: "tableitem",
        rollabletableid: table.get("id")
    });

    if (tableItems.length === 0) {
        sendChat("API", `/w gm ${tableName} has no items.`);
        return "";
    }

    var randomIndex = randomInteger(tableItems.length) - 1;
    return tableItems[randomIndex].get("name");
}

function replaceSpecialResultsSETOO(result, tableName) {
    if (result === "Descriptor + Focus") {
        var descriptor = getRandomItemFromTableSETOO("Core-Descriptor");
        var focus = getRandomItemFromTableSETOO("Core-Focus");
        return descriptor + " + " + focus;
    }
    if (result === "Action + Theme") {
        var action = getRandomItemFromTableSETOO("Core-Action");
        var theme = getRandomItemFromTableSETOO("Core-Theme");
        return action + " + " + theme;
    }
    if (result === "Roll twice") {
        var firstResult = getFinalResultFromTableSETOO(tableName);
        var secondResult = getFinalResultFromTableSETOO(tableName);
        return firstResult + " + " + secondResult;
    }
    return result;
}

function getFinalResultFromTableSETOO(tableName) {
    var result;
    do {
        result = getRandomItemFromTableSETOO(tableName);
    } while (result === "Roll twice" || result === "Action + Theme" || result === "Descriptor + Focus");
    return replaceSpecialResultsSETOO(result, tableName);
}

// This script creates a Handout for a Orbital Settlement in the Expanse region.

on("chat:message", function(msg) {
    if (msg.type === "api" && msg.content === "!createSettlementOEHandout") {
        createSettlementOEHandout();
    }
});

function createSettlementOEHandout() {
    var settlementName = replaceSpecialResultsSETOE(getRandomItemFromTableSETOE("Settlement-Name"), "Settlement-Name");

    var handoutName = `Settlement: ${settlementName}`;

    var population = replaceSpecialResultsSETOE(getRandomItemFromTableSETOE("Settlement-Population-Expanse"), "Settlement-Population-Expanse");
    var firstLook = replaceSpecialResultsSETOE(getRandomItemFromTableSETOE("Settlement-First-Look"), "Settlement-First-Look");
    var initialContact = replaceSpecialResultsSETOE(getRandomItemFromTableSETOE("Settlement-Initial-Contact"), "Settlement-Initial-Contact");
    var authority = replaceSpecialResultsSETOE(getRandomItemFromTableSETOE("Settlement-Authority"), "Settlement-Authority");
    var projects = replaceSpecialResultsSETOE(getRandomItemFromTableSETOE("Settlement-Projects"), "Settlement-Projects");
    var troubles = replaceSpecialResultsSETOE(getRandomItemFromTableSETOE("Settlement-Trouble"), "Settlement-Trouble");

    var handout = createObj("handout", {
        name: handoutName,
        inplayerjournals: "all"
    });

    var content = `<b>Settlement Name:</b> ${settlementName}<br>` +
                  `<br>` +
                  `<b>Region:</b> Expanse<br>` +
                  `<br>` +
                  `<b>Planet:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<b>Location:</b> Orbital<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Population:</b> ${population}<br>` +
                  `<br>` +
                  `<b>Authority:</b> ${authority}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>First Look:</b> ${firstLook}<br>` +
                  `<br>` +
                  `<b>Initial contact:</b> ${initialContact}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Projects:</b> ${projects}<br>` +
                  `<br>` +
                  `<b>Troubles:</b> ${troubles}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Notes:</b></b>&nbsp;<br>`;

    handout.set("notes", content);
}

function getRandomItemFromTableSETOE(tableName) {
    var table = findObjs({
        type: "rollabletable",
        name: tableName
    })[0];

    if (!table) {
        sendChat("API", `/w gm Unable to locate a rollable table called ${tableName}`);
        return "";
    }

    var tableItems = findObjs({
        type: "tableitem",
        rollabletableid: table.get("id")
    });

    if (tableItems.length === 0) {
        sendChat("API", `/w gm ${tableName} has no items.`);
        return "";
    }

    var randomIndex = randomInteger(tableItems.length) - 1;
    return tableItems[randomIndex].get("name");
}

function replaceSpecialResultsSETOE(result, tableName) {
    if (result === "Descriptor + Focus") {
        var descriptor = getRandomItemFromTableSETOE("Core-Descriptor");
        var focus = getRandomItemFromTableSETOE("Core-Focus");
        return descriptor + " + " + focus;
    }
    if (result === "Action + Theme") {
        var action = getRandomItemFromTableSETOE("Core-Action");
        var theme = getRandomItemFromTableSETOE("Core-Theme");
        return action + " + " + theme;
    }
    if (result === "Roll twice") {
        var firstResult = getFinalResultFromTableSETOE(tableName);
        var secondResult = getFinalResultFromTableSETOE(tableName);
        return firstResult + " + " + secondResult;
    }
    return result;
}

function getFinalResultFromTableSETOE(tableName) {
    var result;
    do {
        result = getRandomItemFromTableSETOE(tableName);
    } while (result === "Roll twice" || result === "Action + Theme" || result === "Descriptor + Focus");
    return replaceSpecialResultsSETOE(result, tableName);
}

// This script creates a Handout for a Deep Space Settlement in the Terminus region.

on("chat:message", function(msg) {
    if (msg.type === "api" && msg.content === "!createSettlementDTHandout") {
        createSettlementDTHandout();
    }
});

function createSettlementDTHandout() {
    var settlementName = replaceSpecialResultsSETDT(getRandomItemFromTableSETDT("Settlement-Name"), "Settlement-Name");

    var handoutName = `Settlement: ${settlementName}`;

    var population = replaceSpecialResultsSETDT(getRandomItemFromTableSETDT("Settlement-Population-Terminus"), "Settlement-Population-Terminus");
    var firstLook = replaceSpecialResultsSETDT(getRandomItemFromTableSETDT("Settlement-First-Look"), "Settlement-First-Look");
    var initialContact = replaceSpecialResultsSETDT(getRandomItemFromTableSETDT("Settlement-Initial-Contact"), "Settlement-Initial-Contact");
    var authority = replaceSpecialResultsSETDT(getRandomItemFromTableSETDT("Settlement-Authority"), "Settlement-Authority");
    var projects = replaceSpecialResultsSETDT(getRandomItemFromTableSETOE("Settlement-Projects"), "Settlement-Projects");
    var troubles = replaceSpecialResultsSETDT(getRandomItemFromTableSETOE("Settlement-Trouble"), "Settlement-Trouble");

    var handout = createObj("handout", {
        name: handoutName,
        inplayerjournals: "all"
    });

    var content = `<b>Settlement Name:</b> ${settlementName}<br>` +
                  `<br>` +
                  `<b>Region:</b> Terminus<br>` +
                  `<br>` +
                  `<b>Location:</b> Deep Space<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Population:</b> ${population}<br>` +
                  `<br>` +
                  `<b>Authority:</b> ${authority}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>First Look:</b> ${firstLook}<br>` +
                  `<br>` +
                  `<b>Initial contact:</b> ${initialContact}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Projects:</b> ${projects}<br>` +
                  `<br>` +
                  `<b>Troubles:</b> ${troubles}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Notes:</b></b>&nbsp;<br>`;

    handout.set("notes", content);
}

function getRandomItemFromTableSETDT(tableName) {
    var table = findObjs({
        type: "rollabletable",
        name: tableName
    })[0];

    if (!table) {
        sendChat("API", `/w gm Unable to locate a rollable table called ${tableName}`);
        return "";
    }

    var tableItems = findObjs({
        type: "tableitem",
        rollabletableid: table.get("id")
    });

    if (tableItems.length === 0) {
        sendChat("API", `/w gm ${tableName} has no items.`);
        return "";
    }

    var randomIndex = randomInteger(tableItems.length) - 1;
    return tableItems[randomIndex].get("name");
}

function replaceSpecialResultsSETDT(result, tableName) {
    if (result === "Descriptor + Focus") {
        var descriptor = getRandomItemFromTableSETDT("Core-Descriptor");
        var focus = getRandomItemFromTableSETDT("Core-Focus");
        return descriptor + " + " + focus;
    }
    if (result === "Action + Theme") {
        var action = getRandomItemFromTableSETDT("Core-Action");
        var theme = getRandomItemFromTableSETDT("Core-Theme");
        return action + " + " + theme;
    }
    if (result === "Roll twice") {
        var firstResult = getFinalResultFromTableSETDT(tableName);
        var secondResult = getFinalResultFromTableSETDT(tableName);
        return firstResult + " + " + secondResult;
    }
    return result;
}

function getFinalResultFromTableSETDT(tableName) {
    var result;
    do {
        result = getRandomItemFromTableSETDT(tableName);
    } while (result === "Roll twice" || result === "Action + Theme" || result === "Descriptor + Focus");
    return replaceSpecialResultsSETDT(result, tableName);
}

// This script creates a Handout for a Deep Space Settlement in the Outlands region.

on("chat:message", function(msg) {
    if (msg.type === "api" && msg.content === "!createSettlementDOHandout") {
        createSettlementDOHandout();
    }
});

function createSettlementDOHandout() {
    var settlementName = replaceSpecialResultsSETDO(getRandomItemFromTableSETDO("Settlement-Name"), "Settlement-Name");

    var handoutName = `Settlement: ${settlementName}`;

    var population = replaceSpecialResultsSETDO(getRandomItemFromTableSETDO("Settlement-Population-Outlands"), "Settlement-Population-Outlands");
    var firstLook = replaceSpecialResultsSETDO(getRandomItemFromTableSETDO("Settlement-First-Look"), "Settlement-First-Look");
    var initialContact = replaceSpecialResultsSETDO(getRandomItemFromTableSETDO("Settlement-Initial-Contact"), "Settlement-Initial-Contact");
    var authority = replaceSpecialResultsSETDO(getRandomItemFromTableSETDO("Settlement-Authority"), "Settlement-Authority");
    var projects = replaceSpecialResultsSETDO(getRandomItemFromTableSETDO("Settlement-Projects"), "Settlement-Projects");
    var troubles = replaceSpecialResultsSETDO(getRandomItemFromTableSETDO("Settlement-Trouble"), "Settlement-Trouble");

    var handout = createObj("handout", {
        name: handoutName,
        inplayerjournals: "all"
    });

    var content = `<b>Settlement Name:</b> ${settlementName}<br>` +
                  `<br>` +
                  `<b>Region:</b> Terminus<br>` +
                  `<br>` +
                  `<b>Location:</b> Deep Space<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Population:</b> ${population}<br>` +
                  `<br>` +
                  `<b>Authority:</b> ${authority}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>First Look:</b> ${firstLook}<br>` +
                  `<br>` +
                  `<b>Initial contact:</b> ${initialContact}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Projects:</b> ${projects}<br>` +
                  `<br>` +
                  `<b>Troubles:</b> ${troubles}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Notes:</b></b>&nbsp;<br>`;

    handout.set("notes", content);
}

function getRandomItemFromTableSETDO(tableName) {
    var table = findObjs({
        type: "rollabletable",
        name: tableName
    })[0];

    if (!table) {
        sendChat("API", `/w gm Unable to locate a rollable table called ${tableName}`);
        return "";
    }

    var tableItems = findObjs({
        type: "tableitem",
        rollabletableid: table.get("id")
    });

    if (tableItems.length === 0) {
        sendChat("API", `/w gm ${tableName} has no items.`);
        return "";
    }

    var randomIndex = randomInteger(tableItems.length) - 1;
    return tableItems[randomIndex].get("name");
}

function replaceSpecialResultsSETDO(result, tableName) {
    if (result === "Descriptor + Focus") {
        var descriptor = getRandomItemFromTableSETDO("Core-Descriptor");
        var focus = getRandomItemFromTableSETDO("Core-Focus");
        return descriptor + " + " + focus;
    }
    if (result === "Action + Theme") {
        var action = getRandomItemFromTableSETDO("Core-Action");
        var theme = getRandomItemFromTableSETDO("Core-Theme");
        return action + " + " + theme;
    }
    if (result === "Roll twice") {
        var firstResult = getFinalResultFromTableSETDO(tableName);
        var secondResult = getFinalResultFromTableSETDO(tableName);
        return firstResult + " + " + secondResult;
    }
    return result;
}

function getFinalResultFromTableSETDO(tableName) {
    var result;
    do {
        result = getRandomItemFromTableSETDO(tableName);
    } while (result === "Roll twice" || result === "Action + Theme" || result === "Descriptor + Focus");
    return replaceSpecialResultsSETDO(result, tableName);
}

// This script creates a Handout for a Deep Space Settlement in the Expanse region. 

on("chat:message", function(msg) {
    if (msg.type === "api" && msg.content === "!createSettlementDEHandout") {
        createSettlementDEHandout();
    }
});

function createSettlementDEHandout() {
    var settlementName = replaceSpecialResultsSETDE(getRandomItemFromTableSETDE("Settlement-Name"), "Settlement-Name");

    var handoutName = `Settlement: ${settlementName}`;

    var population = replaceSpecialResultsSETDE(getRandomItemFromTableSETDE("Settlement-Population-Expanse"), "Settlement-Population-Expanse");
    var firstLook = replaceSpecialResultsSETDE(getRandomItemFromTableSETDE("Settlement-First-Look"), "Settlement-First-Look");
    var initialContact = replaceSpecialResultsSETDE(getRandomItemFromTableSETDE("Settlement-Initial-Contact"), "Settlement-Initial-Contact");
    var authority = replaceSpecialResultsSETDE(getRandomItemFromTableSETDE("Settlement-Authority"), "Settlement-Authority");
    var projects = replaceSpecialResultsSETDE(getRandomItemFromTableSETDE("Settlement-Projects"), "Settlement-Projects");
    var troubles = replaceSpecialResultsSETDE(getRandomItemFromTableSETDE("Settlement-Trouble"), "Settlement-Trouble");

    var handout = createObj("handout", {
        name: handoutName,
        inplayerjournals: "all"
    });

    var content = `<b>Settlement Name:</b> ${settlementName}<br>` +
                  `<br>` +
                  `<b>Region:</b> Expanse<br>` +
                  `<br>` +
                  `<b>Location:</b> Deep Space<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Population:</b> ${population}<br>` +
                  `<br>` +
                  `<b>Authority:</b> ${authority}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>First Look:</b> ${firstLook}<br>` +
                  `<br>` +
                  `<b>Initial contact:</b> ${initialContact}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Projects:</b> ${projects}<br>` +
                  `<br>` +
                  `<b>Troubles:</b> ${troubles}<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Notes:</b></b>&nbsp;<br>`;

    handout.set("notes", content);
}

function getRandomItemFromTableSETDE(tableName) {
    var table = findObjs({
        type: "rollabletable",
        name: tableName
    })[0];

    if (!table) {
        sendChat("API", `/w gm Unable to locate a rollable table called ${tableName}`);
        return "";
    }

    var tableItems = findObjs({
        type: "tableitem",
        rollabletableid: table.get("id")
    });

    if (tableItems.length === 0) {
        sendChat("API", `/w gm ${tableName} has no items.`);
        return "";
    }

    var randomIndex = randomInteger(tableItems.length) - 1;
    return tableItems[randomIndex].get("name");
}

function replaceSpecialResultsSETDE(result, tableName) {
    if (result === "Descriptor + Focus") {
        var descriptor = getRandomItemFromTableSETDE("Core-Descriptor");
        var focus = getRandomItemFromTableSETDE("Core-Focus");
        return descriptor + " + " + focus;
    }
    if (result === "Action + Theme") {
        var action = getRandomItemFromTableSETDE("Core-Action");
        var theme = getRandomItemFromTableSETDE("Core-Theme");
        return action + " + " + theme;
    }
    if (result === "Roll twice") {
        var firstResult = getFinalResultFromTableSETDE(tableName);
        var secondResult = getFinalResultFromTableSETDE(tableName);
        return firstResult + " + " + secondResult;
    }
    return result;
}

function getFinalResultFromTableSETDE(tableName) {
    var result;
    do {
        result = getRandomItemFromTableSETDE(tableName);
    } while (result === "Roll twice" || result === "Action + Theme" || result === "Descriptor + Focus");
    return replaceSpecialResultsSETDE(result, tableName);
}

// This script creates a Blank Handout for a Settlement with only the name generated.

on("chat:message", function(msg) {
    if (msg.type === "api" && msg.content === "!createSettlementBLHandout") {
        createSettlementBLHandout();
    }
});

function createSettlementBLHandout() {
    var settlementName = replaceSpecialResultsSETBL(getRandomItemFromTableSETBL("Settlement-Name"), "Settlement-Name");

    var handoutName = `Settlement: ${settlementName}`;

    var population = replaceSpecialResultsSETBL(getRandomItemFromTableSETBL("Settlement-Population-Expanse"), "Settlement-Population-Expanse");
    var firstLook = replaceSpecialResultsSETBL(getRandomItemFromTableSETBL("Settlement-First-Look"), "Settlement-First-Look");
    var initialContact = replaceSpecialResultsSETBL(getRandomItemFromTableSETBL("Settlement-Initial-Contact"), "Settlement-Initial-Contact");
    var authority = replaceSpecialResultsSETBL(getRandomItemFromTableSETBL("Settlement-Authority"), "Settlement-Authority");
    var projects = replaceSpecialResultsSETBL(getRandomItemFromTableSETBL("Settlement-Projects"), "Settlement-Projects");
    var troubles = replaceSpecialResultsSETBL(getRandomItemFromTableSETBL("Settlement-Trouble"), "Settlement-Trouble");

    var handout = createObj("handout", {
        name: handoutName,
        inplayerjournals: "all"
    });

    var content = `<b>Settlement Name:</b> ${settlementName}<br>` +
                  `<br>` +
                  `<b>Region:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<b>Planet:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<b>Location:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Population:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<b>Authority:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>First Look:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<b>Initial contact:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Projects:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<b>Troubles:</b></b>&nbsp;<br>` +
                  `<br>` +
                  `<br>` +
                  `<b>Notes:</b></b>&nbsp;<br>`;

    handout.set("notes", content);
}

function getRandomItemFromTableSETBL(tableName) {
    var table = findObjs({
        type: "rollabletable",
        name: tableName
    })[0];

    if (!table) {
        sendChat("API", `/w gm Unable to locate a rollable table called ${tableName}`);
        return "";
    }

    var tableItems = findObjs({
        type: "tableitem",
        rollabletableid: table.get("id")
    });

    if (tableItems.length === 0) {
        sendChat("API", `/w gm ${tableName} has no items.`);
        return "";
    }

    var randomIndex = randomInteger(tableItems.length) - 1;
    return tableItems[randomIndex].get("name");
}

function replaceSpecialResultsSETBL(result, tableName) {
    if (result === "Descriptor + Focus") {
        var descriptor = getRandomItemFromTableSETBL("Core-Descriptor");
        var focus = getRandomItemFromTableSETBL("Core-Focus");
        return descriptor + " + " + focus;
    }
    if (result === "Action + Theme") {
        var action = getRandomItemFromTableSETBL("Core-Action");
        var theme = getRandomItemFromTableSETBL("Core-Theme");
        return action + " + " + theme;
    }
    if (result === "Roll twice") {
        var firstResult = getFinalResultFromTableSETBL(tableName);
        var secondResult = getFinalResultFromTableSETBL(tableName);
        return firstResult + " + " + secondResult;
    }
    return result;
}

function getFinalResultFromTableSETBL(tableName) {
    var result;
    do {
        result = getRandomItemFromTableSETBL(tableName);
    } while (result === "Roll twice" || result === "Action + Theme" || result === "Descriptor + Focus");
    return replaceSpecialResultsSETBL(result, tableName);
}

//
// These scripts generate handouts for Spacecraft.
//

// Creat a Scapecraft handout for the Terminus region.

on("chat:message", function(msg) {
    if (msg.type === "api" && msg.content === "!createSpacecraftTHandout") {
        createSpacecraftTHandout();
    }
});

function createSpacecraftTHandout() {
    var starshipName = replaceSpecialResultsSPACECT(getRandomItemFromTableSPACECT("Starship-Name"), "Starship-Name");
    var starshipType = replaceSpecialResultsSPACECT(getRandomItemFromTableSPACECT("Starship-Type"), "Starship-Type");

    var secondStarshipName = '';
    if (starshipType === "Currently in conflict with another ship") {
        do {
            secondStarshipName = getRandomItemFromTableSPACECT("Starship-Name");
        } while (secondStarshipName === starshipName);

        do {
            starshipType = getRandomItemFromTableSPACECT("Starship-Type");
        } while (starshipType === "Currently in conflict with another ship");
    }

    var handoutContent = getHandoutContentSPACECT(starshipName, starshipType, secondStarshipName);
    createHandoutSPACECT(starshipName, handoutContent);

    if (secondStarshipName !== '') {
        var secondStarshipType;
        do {
            secondStarshipType = getRandomItemFromTableSPACECT("Starship-Type");
        } while (secondStarshipType === "Currently in conflict with another ship");
        
        var secondHandoutContent = getHandoutContentSPACECT(secondStarshipName, secondStarshipType, starshipName);
        createHandoutSPACECT(secondStarshipName, secondHandoutContent);
    }
}

function getHandoutContentSPACECT(starshipName, starshipType, conflictStarshipName) {
    var initialContact = replaceSpecialResultsSPACECT(getRandomItemFromTableSPACECT("Starship-Initial-Contact"), "Starship-Initial-Contact");
    var firstLook = replaceSpecialResultsSPACECT(getRandomItemFromTableSPACECT("Starship-First-Look"), "Starship-First-Look");
    var mission = replaceSpecialResultsSPACECT(getRandomItemFromTableSPACECT("Starship-Mission-Terminus"), "Starship-Mission-Terminus");

    var conflictNote = '';
    if (conflictStarshipName !== '') {
        conflictNote = `The craft is currently in conflict with another ship (the ${conflictStarshipName}).<br>`;
    }

    if (starshipType === "Unusual or unknown") {
        var descriptor = getRandomItemFromTableSPACECT("Core-Descriptor");
        var theme = getRandomItemFromTableSPACECT("Core-Theme");
        starshipType += ` (Descriptor + Theme: ${descriptor} + ${theme})`;
    }

    var content = `<b>Name:</b> ${starshipName}<br>` +
                  `<br>` +
                  `<b>Type:</b> ${starshipType}<br>` +
                  `<br>` +
                  `<b>Region:</b> Terminus<br>` +
                  `<br>` +
                  `<b>Initial Contact:</b> ${initialContact}<br>` +
                  `<br>` +
                  `<b>First Look:</b> ${firstLook}<br>` +
                  `<br>` +
                  `<b>Mission:</b> ${mission}<br>` +
                  `<br>` +
                  `<b>Notes:</b>&nbsp;<br>` +
                  `${conflictNote}`;
    
    return content;
}

function createHandoutSPACECT(starshipName, content) {
    var handoutName = `Spacecraft: ${starshipName}`;

    var handout = createObj("handout", {
        name: handoutName,
        inplayerjournals: "all"
    });

    handout.set("notes", content);
}

function getRandomItemFromTableSPACECT(tableName) {
    var table = findObjs({
        type: "rollabletable",
        name: tableName
    })[0];

    if (!table) {
        sendChat("API", `/w gm Unable to locate a rollable table called ${tableName}`);
        return "";
    }

    var tableItems = findObjs({
        type: "tableitem",
        rollabletableid: table.get("id")
    });

    if (tableItems.length === 0) {
        sendChat("API", `/w gm ${tableName} has no items.`);
        return "";
    }

    var randomIndex = randomInteger(tableItems.length) - 1;
    return tableItems[randomIndex].get("name");
}

function replaceSpecialResultsSPACECT(result, tableName) {
    if (result === "Descriptor + Focus") {
        var descriptor = getRandomItemFromTableSPACECT("Core-Descriptor");
        var focus = getRandomItemFromTableSPACECT("Core-Focus");
        return descriptor + " + " + focus;
    }
    if (result === "Action + Theme") {
        var action = getRandomItemFromTableSPACECT("Core-Action");
        var theme = getRandomItemFromTableSPACECT("Core-Theme");
        return action + " + " + theme;
    }
    if (result === "Roll twice" && tableName === "Starship-Mission-Terminus") {
        var firstResult;
        do {
            firstResult = getRandomItemFromTableSPACECT(tableName);
        } while (firstResult === "Roll twice" || firstResult === "Action + Theme");

        var secondResult;
        do {
            secondResult = getRandomItemFromTableSPACECT(tableName);
        } while (secondResult === "Roll twice" || secondResult === "Action + Theme" || secondResult === firstResult);

        return firstResult + " + " + secondResult;
    }
    return result;
}

// Creat a Scapecraft handout for the Outlands region.

on("chat:message", function(msg) {
    if (msg.type === "api" && msg.content === "!createSpacecraftOHandout") {
        createSpacecraftOHandout();
    }
});

function createSpacecraftOHandout() {
    var starshipName = replaceSpecialResultsSPACECO(getRandomItemFromTableSPACECO("Starship-Name"), "Starship-Name");
    var starshipType = replaceSpecialResultsSPACECO(getRandomItemFromTableSPACECO("Starship-Type"), "Starship-Type");

    var secondStarshipName = '';
    if (starshipType === "Currently in conflict with another ship") {
        do {
            secondStarshipName = getRandomItemFromTableSPACECO("Starship-Name");
        } while (secondStarshipName === starshipName);

        do {
            starshipType = getRandomItemFromTableSPACECO("Starship-Type");
        } while (starshipType === "Currently in conflict with another ship");
    }

    var handoutContent = getHandoutOContent(starshipName, starshipType, secondStarshipName);
    createOHandout(starshipName, handoutContent);

    if (secondStarshipName !== '') {
        var secondStarshipType;
        do {
            secondStarshipType = getRandomItemFromTableSPACECO("Starship-Type");
        } while (secondStarshipType === "Currently in conflict with another ship");
        
        var secondHandoutContent = getHandoutOContent(secondStarshipName, secondStarshipType, starshipName);
        createOHandout(secondStarshipName, secondHandoutContent);
    }
}

function getHandoutOContent(starshipName, starshipType, conflictStarshipName) {
    var initialContact = replaceSpecialResultsSPACECO(getRandomItemFromTableSPACECO("Starship-Initial-Contact"), "Starship-Initial-Contact");
    var firstLook = replaceSpecialResultsSPACECO(getRandomItemFromTableSPACECO("Starship-First-Look"), "Starship-First-Look");
    var mission = replaceSpecialResultsSPACECO(getRandomItemFromTableSPACECO("Starship-Mission-Outlands"), "Starship-Mission-Outlands");

    var conflictNote = '';
    if (conflictStarshipName !== '') {
        conflictNote = `The craft is currently in conflict with another ship (the ${conflictStarshipName}).<br>`;
    }

    if (starshipType === "Unusual or unknown") {
        var descriptor = getRandomItemFromTableSPACECO("Core-Descriptor");
        var theme = getRandomItemFromTableSPACECO("Core-Theme");
        starshipType += ` (Descriptor + Theme: ${descriptor} + ${theme})`;
    }

    var content = `<b>Name:</b> ${starshipName}<br>` +
                  `<br>` +
                  `<b>Type:</b> ${starshipType}<br>` +
                  `<br>` +
                  `<b>Region:</b> Outlands<br>` +
                  `<br>` +
                  `<b>Initial Contact:</b> ${initialContact}<br>` +
                  `<br>` +
                  `<b>First Look:</b> ${firstLook}<br>` +
                  `<br>` +
                  `<b>Mission:</b> ${mission}<br>` +
                  `<br>` +
                  `<b>Notes:</b>&nbsp;<br>` +
                  `${conflictNote}`;
    
    return content;
}

function createOHandout(starshipName, content) {
    var handoutName = `Spacecraft: ${starshipName}`;

    var handout = createObj("handout", {
        name: handoutName,
        inplayerjournals: "all"
    });

    handout.set("notes", content);
}

function getRandomItemFromTableSPACECO(tableName) {
    var table = findObjs({
        type: "rollabletable",
        name: tableName
    })[0];

    if (!table) {
        sendChat("API", `/w gm Unable to locate a rollable table called ${tableName}`);
        return "";
    }

    var tableItems = findObjs({
        type: "tableitem",
        rollabletableid: table.get("id")
    });

    if (tableItems.length === 0) {
        sendChat("API", `/w gm ${tableName} has no items.`);
        return "";
    }

    var randomIndex = randomInteger(tableItems.length) - 1;
    return tableItems[randomIndex].get("name");
}

function replaceSpecialResultsSPACECO(result, tableName) {
    if (result === "Descriptor + Focus") {
        var descriptor = getRandomItemFromTableSPACECO("Core-Descriptor");
        var focus = getRandomItemFromTableSPACECO("Core-Focus");
        return descriptor + " + " + focus;
    }
    if (result === "Action + Theme") {
        var action = getRandomItemFromTableSPACECO("Core-Action");
        var theme = getRandomItemFromTableSPACECO("Core-Theme");
        return action + " + " + theme;
    }
    if (result === "Roll twice" && tableName === "Starship-Mission-Outlands") {
        var firstResult;
        do {
            firstResult = getRandomItemFromTableSPACECO(tableName);
        } while (firstResult === "Roll twice" || firstResult === "Action + Theme");

        var secondResult;
        do {
            secondResult = getRandomItemFromTableSPACECO(tableName);
        } while (secondResult === "Roll twice" || secondResult === "Action + Theme" || secondResult === firstResult);

        return firstResult + " + " + secondResult;
    }
    return result;
}

// Creat a Scapecraft handout for the Expanse region.

on("chat:message", function(msg) {
    if (msg.type === "api" && msg.content === "!createSpacecraftEHandout") {
        createSpacecraftEHandout();
    }
});

function createSpacecraftEHandout() {
    var starshipName = replaceSpecialResultsSPACECE(getRandomItemFromTableSPACECE("Starship-Name"), "Starship-Name");
    var starshipType = replaceSpecialResultsSPACECE(getRandomItemFromTableSPACECE("Starship-Type"), "Starship-Type");

    var secondStarshipName = '';
    if (starshipType === "Currently in conflict with another ship") {
        do {
            secondStarshipName = getRandomItemFromTableSPACECE("Starship-Name");
        } while (secondStarshipName === starshipName);

        do {
            starshipType = getRandomItemFromTableSPACECE("Starship-Type");
        } while (starshipType === "Currently in conflict with another ship");
    }

    var handoutContent = getHandoutEContent(starshipName, starshipType, secondStarshipName);
    createEHandout(starshipName, handoutContent);

    if (secondStarshipName !== '') {
        var secondStarshipType;
        do {
            secondStarshipType = getRandomItemFromTableSPACECE("Starship-Type");
        } while (secondStarshipType === "Currently in conflict with another ship");
        
        var secondHandoutContent = getHandoutEContent(secondStarshipName, secondStarshipType, starshipName);
        createEHandout(secondStarshipName, secondHandoutContent);
    }
}

function getHandoutEContent(starshipName, starshipType, conflictStarshipName) {
    var initialContact = replaceSpecialResultsSPACECE(getRandomItemFromTableSPACECE("Starship-Initial-Contact"), "Starship-Initial-Contact");
    var firstLook = replaceSpecialResultsSPACECE(getRandomItemFromTableSPACECE("Starship-First-Look"), "Starship-First-Look");
    var mission = replaceSpecialResultsSPACECE(getRandomItemFromTableSPACECE("Starship-Mission-Expanse"), "Starship-Mission-Expanse");

    var conflictNote = '';
    if (conflictStarshipName !== '') {
        conflictNote = `The craft is currently in conflict with another ship (the ${conflictStarshipName}).<br>`;
    }

    if (starshipType === "Unusual or unknown") {
        var descriptor = getRandomItemFromTableSPACECE("Core-Descriptor");
        var theme = getRandomItemFromTableSPACECE("Core-Theme");
        starshipType += ` (Descriptor + Theme: ${descriptor} + ${theme})`;
    }

    var content = `<b>Name:</b> ${starshipName}<br>` +
                  `<br>` +
                  `<b>Type:</b> ${starshipType}<br>` +
                  `<br>` +
                  `<b>Region:</b> Expanse<br>` +
                  `<br>` +
                  `<b>Initial Contact:</b> ${initialContact}<br>` +
                  `<br>` +
                  `<b>First Look:</b> ${firstLook}<br>` +
                  `<br>` +
                  `<b>Mission:</b> ${mission}<br>` +
                  `<br>` +
                  `<b>Notes:</b>&nbsp;<br>` +
                  `${conflictNote}`;
    
    return content;
}

function createEHandout(starshipName, content) {
    var handoutName = `Spacecraft: ${starshipName}`;

    var handout = createObj("handout", {
        name: handoutName,
        inplayerjournals: "all"
    });

    handout.set("notes", content);
}

function getRandomItemFromTableSPACECE(tableName) {
    var table = findObjs({
        type: "rollabletable",
        name: tableName
    })[0];

    if (!table) {
        sendChat("API", `/w gm Unable to locate a rollable table called ${tableName}`);
        return "";
    }

    var tableItems = findObjs({
        type: "tableitem",
        rollabletableid: table.get("id")
    });

    if (tableItems.length === 0) {
        sendChat("API", `/w gm ${tableName} has no items.`);
        return "";
    }

    var randomIndex = randomInteger(tableItems.length) - 1;
    return tableItems[randomIndex].get("name");
}

function replaceSpecialResultsSPACECE(result, tableName) {
    if (result === "Descriptor + Focus") {
        var descriptor = getRandomItemFromTableSPACECE("Core-Descriptor");
        var focus = getRandomItemFromTableSPACECE("Core-Focus");
        return descriptor + " + " + focus;
    }
    if (result === "Action + Theme") {
        var action = getRandomItemFromTableSPACECE("Core-Action");
        var theme = getRandomItemFromTableSPACECE("Core-Theme");
        return action + " + " + theme;
    }
    if (result === "Roll twice" && tableName === "Starship-Mission-Expanse") {
        var firstResult;
        do {
            firstResult = getRandomItemFromTableSPACECE(tableName);
        } while (firstResult === "Roll twice" || firstResult === "Action + Theme");

        var secondResult;
        do {
            secondResult = getRandomItemFromTableSPACECE(tableName);
        } while (secondResult === "Roll twice" || secondResult === "Action + Theme" || secondResult === firstResult);

        return firstResult + " + " + secondResult;
    }
    return result;
}

// Creat a blank Scapecraft handout.

on("chat:message", function(msg) {
    if (msg.type === "api" && msg.content === "!createSpacecraftBHandout") {
        createSpacecraftBHandout();
    }
});

function createSpacecraftBHandout() {
    var starshipName = replaceSpecialResultsSPACECBL(getRandomItemFromTableSPACEBL("Starship-Name"), "Starship-Name");
    var starshipType = replaceSpecialResultsSPACECBL(getRandomItemFromTableSPACEBL("Starship-Type"), "Starship-Type");

    var secondStarshipName = '';
    if (starshipType === "Currently in conflict with another ship") {
        do {
            secondStarshipName = getRandomItemFromTableSPACEBL("Starship-Name");
        } while (secondStarshipName === starshipName);

        do {
            starshipType = getRandomItemFromTableSPACEBL("Starship-Type");
        } while (starshipType === "Currently in conflict with another ship");
    }

    var handoutContent = getHandoutBContent(starshipName, starshipType, secondStarshipName);
    createBHandout(starshipName, handoutContent);

    if (secondStarshipName !== '') {
        var secondStarshipType;
        do {
            secondStarshipType = getRandomItemFromTableSPACEBL("Starship-Type");
        } while (secondStarshipType === "Currently in conflict with another ship");
        
        var secondHandoutContent = getHandoutBContent(secondStarshipName, secondStarshipType, starshipName);
        createBHandout(secondStarshipName, secondHandoutContent);
    }
}

function getHandoutBContent(starshipName, starshipType, conflictStarshipName) {
    var initialContact = replaceSpecialResultsSPACECBL(getRandomItemFromTableSPACEBL("Starship-Initial-Contact"), "Starship-Initial-Contact");
    var firstLook = replaceSpecialResultsSPACECBL(getRandomItemFromTableSPACEBL("Starship-First-Look"), "Starship-First-Look");
    var mission = replaceSpecialResultsSPACECBL(getRandomItemFromTableSPACEBL("Starship-Mission-Expanse"), "Starship-Mission-Expanse");

    var conflictNote = '';
    if (conflictStarshipName !== '') {
        conflictNote = `The craft is currently in conflict with another ship (the ${conflictStarshipName}).<br>`;
    }

    if (starshipType === "Unusual or unknown") {
        var descriptor = getRandomItemFromTableSPACEBL("Core-Descriptor");
        var theme = getRandomItemFromTableSPACEBL("Core-Theme");
        starshipType += ` (Descriptor + Theme: ${descriptor} + ${theme})`;
    }

    var content = `<b>Name:</b> ${starshipName}<br>` +
                  `<br>` +
                  `<b>Type:</b>&nbsp;<br>` +
                  `<br>` +
                  `<b>Region:</b>&nbsp;<br>` +
                  `<br>` +
                  `<b>Initial Contact:</b>&nbsp;<br>` +
                  `<br>` +
                  `<b>First Look:</b>&nbsp;<br>` +
                  `<br>` +
                  `<b>Mission:</b>&nbsp;<br>` +
                  `<br>` +
                  `<b>Notes:</b>&nbsp;<br>` +
                  `${conflictNote}`;
    
    return content;
}

function createBHandout(starshipName, content) {
    var handoutName = `Spacecraft: ${starshipName}`;

    var handout = createObj("handout", {
        name: handoutName,
        inplayerjournals: "all"
    });

    handout.set("notes", content);
}

function getRandomItemFromTableSPACEBL(tableName) {
    var table = findObjs({
        type: "rollabletable",
        name: tableName
    })[0];

    if (!table) {
        sendChat("API", `/w gm Unable to locate a rollable table called ${tableName}`);
        return "";
    }

    var tableItems = findObjs({
        type: "tableitem",
        rollabletableid: table.get("id")
    });

    if (tableItems.length === 0) {
        sendChat("API", `/w gm ${tableName} has no items.`);
        return "";
    }

    var randomIndex = randomInteger(tableItems.length) - 1;
    return tableItems[randomIndex].get("name");
}

function replaceSpecialResultsSPACECBL(result, tableName) {
    if (result === "Descriptor + Focus") {
        var descriptor = getRandomItemFromTableSPACEBL("Core-Descriptor");
        var focus = getRandomItemFromTableSPACEBL("Core-Focus");
        return descriptor + " + " + focus;
    }
    if (result === "Action + Theme") {
        var action = getRandomItemFromTableSPACEBL("Core-Action");
        var theme = getRandomItemFromTableSPACEBL("Core-Theme");
        return action + " + " + theme;
    }
    if (result === "Roll twice" && tableName === "Starship-Mission-Expanse") {
        var firstResult;
        do {
            firstResult = getRandomItemFromTableSPACEBL(tableName);
        } while (firstResult === "Roll twice" || firstResult === "Action + Theme");

        var secondResult;
        do {
            secondResult = getRandomItemFromTableSPACEBL(tableName);
        } while (secondResult === "Roll twice" || secondResult === "Action + Theme" || secondResult === firstResult);

        return firstResult + " + " + secondResult;
    }
    return result;
}

//
// This will create the Macros
//

on("chat:message", function(msg) {
  if (msg.type === "api" && msg.content === "!BecomeStarForged") {
    var player = msg.playerid;
    createMacro("Action-and-Theme", "&{template:default} {{name=**Action + Theme**}} {{Action:=[[1t[Core-Action]]]}} {{Theme:=[[1t[Core-Theme]]]}}", player);
    createMacro("Descriptor-and-Focus", "&{template:default} {{name=**Descriptor + Focus**}} {{Descriptor:=[[1t[Core-Descriptor]]]}} {{Focus:=[[1t[Core-Focus]]]}}", player);
    createMacro("Generate-NPC", "?{Create an NPC handout with everything OR only the name filled out?|Only the Name,!createNPCHandout|Everything,!createFullNPCHandout}", player);
    createMacro("Generate-Planet", "?{Generate a Blank Planet with only a name OR a full planet from one of the core regions (Terminus, Outlands or Expanse)? |Blank Planet,!createPlanetHandout|Terminus,!createFullTPlanetHandout|Outlands,!createFullOPlanetHandout|Expanse,!createFullEPlanetHandout}", player);
    createMacro("Generate-Settlement", "?{Generate a Blank Settlement with only a name OR a full settlement from one of the core regions (Terminus, Outlands or Expanse)? |Blank Settlement,!createSettlementBLHandout|Terminus (Planetside),!createSettlementPTHandout|Terminus (Orbital),!createSettlementOTHandout|Outlands (Planetside),!createSettlementPOHandout|Outlands (Orbital),!createSettlementOOHandout|Expanse (Planetside),!createSettlementPEHandout|Expanse (Orbital),!createSettlementOEHandout}", player);
    createMacro("Generate-Spacecraft", "?{Generate a Blank Spacecraft with only a name OR a full Spacecraft from one of the core regions (Terminus, Outlands or Expanse)? |Blank Spacecraft,!createSpacecraftBHandout|Terminus,!createSpacecraftTHandout|Outlands,!createSpacecraftOHandout|Expanse,!createSpacecraftEHandout}", player);
  }
});

function createMacro(name, action, player) {
  var macro = findObjs({ type: "macro", name: name, playerid: player })[0];
  if (!macro) {
    createObj("macro", {
      name: name,
      action: action,
      show_players_macrobar: true,
      visibleto: "",
      playerid: player,
      istokenaction: false
    });
    log("Macro created: " + name);
  } else {
    macro.set("action", action);
    log("Macro updated: " + name);
  }
}

//
// This will create the Tables
//

on("chat:message", function(msg) {
    if (msg.type === "api" && msg.content === "!BecomeStarForged") {

// Planet-Names-1
        createTable("Planet-Names-1", [
            {name: "New", weight: 1},
        ]);

// Planet-Names-2
        createTable("Planet-Names-2", [
            {name: "Acamar", weight: 1},
            {name: "Achrid", weight: 1},
            {name: "Adruxia", weight: 1},
            {name: "Agramar", weight: 1},
            {name: "Akura", weight: 1},
            {name: "Alcor", weight: 1},
            {name: "Altara", weight: 1},
            {name: "Althisan", weight: 1},
            {name: "Antium", weight: 1},
            {name: "Aquila", weight: 1},
            {name: "Arcadia", weight: 1},
            {name: "Arinis", weight: 1},
            {name: "Arkan", weight: 1},
            {name: "Ashran", weight: 1},
            {name: "Atallia", weight: 1},
            {name: "Athion", weight: 1},
            {name: "Atlan", weight: 1},
            {name: "Atria", weight: 1},
            {name: "Avarnis", weight: 1},
            {name: "Aven", weight: 1},
            {name: "Balkaran", weight: 1},
            {name: "Bellatrix", weight: 1},
            {name: "Biradan", weight: 1},
            {name: "Brama", weight: 1},
            {name: "Canis", weight: 1},
            {name: "Capella", weight: 1},
            {name: "Castilon", weight: 1},
            {name: "Castor", weight: 1},
            {name: "Cazbin", weight: 1},
            {name: "Charon", weight: 1},
            {name: "Cortan", weight: 1},
            {name: "Corusan", weight: 1},
            {name: "Corvitus", weight: 1},
            {name: "Daraman", weight: 1},
            {name: "Dathia", weight: 1},
            {name: "Degor", weight: 1},
            {name: "Deimos", weight: 1},
            {name: "Delphinus", weight: 1},
            {name: "Deltir", weight: 1},
            {name: "Edara", weight: 1},
            {name: "Elucia", weight: 1},
            {name: "Eris", weight: 1},
            {name: "Evaron", weight: 1},
            {name: "Ezar", weight: 1},
            {name: "Fallon", weight: 1},
            {name: "Fornax", weight: 1},
            {name: "Gara", weight: 1},
            {name: "Garn", weight: 1},
            {name: "Geld", weight: 1},
            {name: "Golgathar", weight: 1},
            {name: "Goshen", weight: 1},
            {name: "Hakan", weight: 1},
            {name: "Haladin", weight: 1},
            {name: "Hikara", weight: 1},
            {name: "Honos", weight: 1},
            {name: "Hypara", weight: 1},
            {name: "Illious", weight: 1},
            {name: "Iridon", weight: 1},
            {name: "Izar", weight: 1},
            {name: "Jara", weight: 1},
            {name: "Kallin", weight: 1},
            {name: "Karnapan", weight: 1},
            {name: "Kastra", weight: 1},
            {name: "Kodana", weight: 1},
            {name: "Koridan", weight: 1},
            {name: "Kormir", weight: 1},
            {name: "Kurma", weight: 1},
            {name: "Leovel", weight: 1},
            {name: "Lepidus", weight: 1},
            {name: "Leto", weight: 1},
            {name: "Lorian", weight: 1},
            {name: "Malakor", weight: 1},
            {name: "Miridan", weight: 1},
            {name: "Mizar", weight: 1},
            {name: "Mortis", weight: 1},
            {name: "Nixia", weight: 1},
            {name: "Orellia", weight: 1},
            {name: "Orpheus", weight: 1},
            {name: "Ortan", weight: 1},
            {name: "Paramon", weight: 1},
            {name: "Parthia", weight: 1},
            {name: "Phylar", weight: 1},
            {name: "Proteus", weight: 1},
            {name: "Rakara", weight: 1},
            {name: "Rana", weight: 1},
            {name: "Ravi", weight: 1},
            {name: "Salamis", weight: 1},
            {name: "Sallis", weight: 1},
            {name: "Shakara", weight: 1},
            {name: "Shiranis", weight: 1},
            {name: "Tallion", weight: 1},
            {name: "Talos", weight: 1},
            {name: "Thalos", weight: 1},
            {name: "Ullrak", weight: 1},
            {name: "Varon", weight: 1},
            {name: "Veridan", weight: 1},
            {name: "Veridian", weight: 1},
            {name: "Vordan", weight: 1},
            {name: "Xepheus", weight: 1},
            {name: "Yutan", weight: 1}
        ]);

// Planet-Names-3
        createTable("Planet-Names-3", [
            {name: "Prime", weight: 1},
            {name: "Alpha", weight: 1},
            {name: "Beta", weight: 1},
            {name: "III", weight: 1},
            {name: "IV", weight: 1},
            {name: "V", weight: 1},
            {name: "VI", weight: 1},
            {name: " ", weight: 10},
        ]);

// NPC-Given-Names
        createTable("NPC-Given-Names", [
            {name: "Akim", weight: 1},
            {name: "Alex", weight: 1},
            {name: "Alexis", weight: 1},
            {name: "Alisa", weight: 1},
            {name: "Althea", weight: 1},
            {name: "Amari", weight: 1},
            {name: "Aparna", weight: 1},
            {name: "Argus", weight: 1},
            {name: "Arnav", weight: 1},
            {name: "Ash", weight: 1},
            {name: "Asha", weight: 1},
            {name: "Astrid", weight: 1},
            {name: "Aurora", weight: 1},
            {name: "Ayako", weight: 1},
            {name: "Azriel", weight: 1},
            {name: "Blake", weight: 1},
            {name: "Brennan", weight: 1},
            {name: "Brianna", weight: 1},
            {name: "Bruna", weight: 1},
            {name: "Bruno", weight: 1},
            {name: "Cassidy", weight: 1},
            {name: "Christa", weight: 1},
            {name: "Cole", weight: 1},
            {name: "Corey", weight: 1},
            {name: "Creed", weight: 1},
            {name: "Derya", weight: 1},
            {name: "Dex", weight: 1},
            {name: "Doran", weight: 1},
            {name: "Echo", weight: 1},
            {name: "Eren", weight: 1},
            {name: "Erim", weight: 1},
            {name: "Esana", weight: 1},
            {name: "Eveline", weight: 1},
            {name: "Faye", weight: 1},
            {name: "Fletcher", weight: 1},
            {name: "Flint", weight: 1},
            {name: "Florian", weight: 1},
            {name: "Gavin", weight: 1},
            {name: "Halia", weight: 1},
            {name: "Ike", weight: 1},
            {name: "Isaac", weight: 1},
            {name: "James", weight: 1},
            {name: "Janya", weight: 1},
            {name: "Jihun", weight: 1},
            {name: "Jorunn", weight: 1},
            {name: "Juliana", weight: 1},
            {name: "Juro", weight: 1},
            {name: "Kaisa", weight: 1},
            {name: "Karthik", weight: 1},
            {name: "Kayla", weight: 1},
            {name: "Kei", weight: 1},
            {name: "Kiana", weight: 1},
            {name: "Kieran", weight: 1},
            {name: "Kierra", weight: 1},
            {name: "Kimora", weight: 1},
            {name: "Kiri", weight: 1},
            {name: "Kirsa", weight: 1},
            {name: "Kwan", weight: 1},
            {name: "Kylar", weight: 1},
            {name: "Landry", weight: 1},
            {name: "Logan", weight: 1},
            {name: "Lowell", weight: 1},
            {name: "Lucas", weight: 1},
            {name: "Curtis", weight: 1},
            {name: "Luna", weight: 1},
            {name: "Lux", weight: 1},
            {name: "Mae", weight: 1},
            {name: "Magnus", weight: 1},
            {name: "Mave", weight: 1},
            {name: "Merrick", weight: 1},
            {name: "Mina", weight: 1},
            {name: "Nashida", weight: 1},
            {name: "Nassar", weight: 1},
            {name: "Ostara", weight: 1},
            {name: "Qasira", weight: 1},
            {name: "Quinn", weight: 1},
            {name: "Ragnar", weight: 1},
            {name: "Raven", weight: 1},
            {name: "Ria", weight: 1},
            {name: "Rokuro", weight: 1},
            {name: "Roland", weight: 1},
            {name: "Rowena", weight: 1},
            {name: "Sage", weight: 1},
            {name: "Saren", weight: 1},
            {name: "Annora", weight: 1},
            {name: "Severinus", weight: 1},
            {name: "Shen", weight: 1},
            {name: "Talia", weight: 1},
            {name: "Tomiko", weight: 1},
            {name: "Ulan", weight: 1},
            {name: "Valda", weight: 1},
            {name: "Venri", weight: 1},
            {name: "Vesper", weight: 1},
            {name: "Vuldar", weight: 1},
            {name: "William", weight: 1},
            {name: "Yelena", weight: 1},
            {name: "Zakia", weight: 1},
            {name: "Zari", weight: 1},
            {name: "Zephyr", weight: 1},
            {name: "Zoya", weight: 1}
        ]);

// NPC-Family-Names
        createTable("NPC-Family-Names", [
            {name: "Kuzmin", weight: 1},
            {name: "Durant", weight: 1},
            {name: "Jefferies", weight: 1},
            {name: "Velez", weight: 1},
            {name: "Lontoc", weight: 1},
            {name: "Wade", weight: 1},
            {name: "Kade", weight: 1},
            {name: "Thorn", weight: 1},
            {name: "Khosla", weight: 1},
            {name: "Hendrix", weight: 1},
            {name: "Okiro", weight: 1},
            {name: "Ripley", weight: 1},
            {name: "Talin", weight: 1},
            {name: "Jin", weight: 1},
            {name: "Finn", weight: 1},
            {name: "Solas", weight: 1},
            {name: "Quint", weight: 1},
            {name: "Keelan", weight: 1},
            {name: "Silva", weight: 1},
            {name: "Valk", weight: 1},
            {name: "O'Brien", weight: 1},
            {name: "Ruiz", weight: 1},
            {name: "Stallard", weight: 1},
            {name: "Mackenson", weight: 1},
            {name: "Jensen", weight: 1},
            {name: "Sakir", weight: 1},
            {name: "Tolari", weight: 1},
            {name: "Kain", weight: 1},
            {name: "Carr", weight: 1},
            {name: "Valenus", weight: 1},
            {name: "Kaan", weight: 1},
            {name: "Taylan", weight: 1},
            {name: "Legrand", weight: 1},
            {name: "Jemison", weight: 1},
            {name: "Arden", weight: 1},
            {name: "Sayer", weight: 1},
            {name: "Kai", weight: 1},
            {name: "Slater", weight: 1},
            {name: "Edris", weight: 1},
            {name: "Sutton", weight: 1},
            {name: "Savarin", weight: 1},
            {name: "Bridger", weight: 1},
            {name: "Mital", weight: 1},
            {name: "Shin", weight: 1},
            {name: "Nadir", weight: 1},
            {name: "Santos", weight: 1},
            {name: "Mihara", weight: 1},
            {name: "Buhari", weight: 1},
            {name: "Salvi", weight: 1},
            {name: "Adler", weight: 1},
            {name: "Takara", weight: 1},
            {name: "Shelton", weight: 1},
            {name: "Vandu", weight: 1},
            {name: "Vega", weight: 1},
            {name: "Zhang", weight: 1},
            {name: "Savela", weight: 1},
            {name: "Hawking", weight: 1},
            {name: "Jen", weight: 1},
            {name: "Hobbs", weight: 1},
            {name: "Holland", weight: 1},
            {name: "Silvius", weight: 1},
            {name: "Freeman", weight: 1},
            {name: "Barbosa", weight: 1},
            {name: "Winter", weight: 1},
            {name: "Hammond", weight: 1},
            {name: "Archer", weight: 1},
            {name: "Barlowe", weight: 1},
            {name: "Shepherd", weight: 1},
            {name: "Griffin", weight: 1},
            {name: "Frost", weight: 1},
            {name: "Quon", weight: 1},
            {name: "Malek", weight: 1},
            {name: "Murad", weight: 1},
            {name: "Becker", weight: 1},
            {name: "Ammar", weight: 1},
            {name: "Braddock", weight: 1},
            {name: "Blackstone", weight: 1},
            {name: "Hadley", weight: 1},
            {name: "Farin", weight: 1},
            {name: "Kobayashi", weight: 1},
            {name: "Duval", weight: 1},
            {name: "Hunter", weight: 1},
            {name: "Beckett", weight: 1},
            {name: "Dykstra", weight: 1},
            {name: "Gray", weight: 1},
            {name: "Sedano", weight: 1},
            {name: "Bai", weight: 1},
            {name: "Booker", weight: 1},
            {name: "Sato", weight: 1},
            {name: "Vayan", weight: 1},
            {name: "Bond", weight: 1},
            {name: "Stark", weight: 1},
            {name: "Stirling", weight: 1},
            {name: "Wolfe", weight: 1},
            {name: "O'Niel", weight: 1},
            {name: "Petrov", weight: 1},
            {name: "Nazari", weight: 1},
            {name: "Darwin", weight: 1},
            {name: "Pearson", weight: 1},
            {name: "Volkov", weight: 1}
        ]);

// NPC-Callsign
        createTable("NPC-Callsign", [
            {name: "Albatross", weight: 1},
            {name: "Angler", weight: 1},
            {name: "Anvil", weight: 1},
            {name: "Badger", weight: 1},
            {name: "Bandit", weight: 1},
            {name: "Bash", weight: 1},
            {name: "Basilisk", weight: 1},
            {name: "Bingo", weight: 1},
            {name: "Blackbird", weight: 1},
            {name: "Blade", weight: 1},
            {name: "Bloodshot", weight: 1},
            {name: "Bluewing", weight: 1},
            {name: "Bonfire", weight: 1},
            {name: "Book", weight: 1},
            {name: "Breaker", weight: 1},
            {name: "Brick", weight: 1},
            {name: "Buzz", weight: 1},
            {name: "Buzzard", weight: 1},
            {name: "Centurion", weight: 1},
            {name: "Chimera", weight: 1},
            {name: "Circuit", weight: 1},
            {name: "Clank", weight: 1},
            {name: "Cleric", weight: 1},
            {name: "Crash", weight: 1},
            {name: "Cutter", weight: 1},
            {name: "Cutthroat", weight: 1},
            {name: "Cypher", weight: 1},
            {name: "Dagger", weight: 1},
            {name: "Dancer", weight: 1},
            {name: "Dash", weight: 1},
            {name: "Deadeye", weight: 1},
            {name: "Deuce", weight: 1},
            {name: "Failsafe", weight: 1},
            {name: "Farseer", weight: 1},
            {name: "Fidget", weight: 1},
            {name: "Firestarter", weight: 1},
            {name: "Fixer", weight: 1},
            {name: "Flatline", weight: 1},
            {name: "Ghost", weight: 1},
            {name: "Grudge", weight: 1},
            {name: "Gutshot", weight: 1},
            {name: "Harrow", weight: 1},
            {name: "Havoc", weight: 1},
            {name: "Hellhound", weight: 1},
            {name: "Hellion", weight: 1},
            {name: "Hex", weight: 1},
            {name: "Hush", weight: 1},
            {name: "Ironclad", weight: 1},
            {name: "Jackal", weight: 1},
            {name: "Jackpot", weight: 1},
            {name: "Jester", weight: 1},
            {name: "Link", weight: 1},
            {name: "Longshot", weight: 1},
            {name: "Mainframe", weight: 1},
            {name: "Mantis", weight: 1},
            {name: "Mimic", weight: 1},
            {name: "Mole", weight: 1},
            {name: "Monarch", weight: 1},
            {name: "Mongoose", weight: 1},
            {name: "Nails", weight: 1},
            {name: "Ogre", weight: 1},
            {name: "Omega", weight: 1},
            {name: "Overload", weight: 1},
            {name: "Packrat", weight: 1},
            {name: "Paladin", weight: 1},
            {name: "Phantom", weight: 1},
            {name: "Phoenix", weight: 1},
            {name: "Pyro", weight: 1},
            {name: "Quickdraw", weight: 1},
            {name: "Razor", weight: 1},
            {name: "Rogue", weight: 1},
            {name: "Rook", weight: 1},
            {name: "Rover", weight: 1},
            {name: "Scout", weight: 1},
            {name: "Shadow", weight: 1},
            {name: "Shark", weight: 1},
            {name: "Shutdown", weight: 1},
            {name: "Slack", weight: 1},
            {name: "Slash", weight: 1},
            {name: "Snipe", weight: 1},
            {name: "Spider", weight: 1},
            {name: "Splinter", weight: 1},
            {name: "Static", weight: 1},
            {name: "Stinger", weight: 1},
            {name: "Straggler", weight: 1},
            {name: "Swindle", weight: 1},
            {name: "Tinker", weight: 1},
            {name: "Touchdown", weight: 1},
            {name: "Tycoon", weight: 1},
            {name: "Vagabond", weight: 1},
            {name: "Valkyrie", weight: 1},
            {name: "Vanguard", weight: 1},
            {name: "Vertigo", weight: 1},
            {name: "Warden", weight: 1},
            {name: "Watchdog", weight: 1},
            {name: "Wayfinder", weight: 1},
            {name: "Whisper", weight: 1},
            {name: "Wraith", weight: 1},
            {name: "Wrongway", weight: 1},
            {name: "Zephyr", weight: 1}
        ]);

// NPC-First-Look
        createTable("NPC-First-Look", [
            {name: "Accented", weight: 3},
            {name: "Accompanied", weight: 3},
            {name: "Adorned", weight: 2},
            {name: "Aged", weight: 3},
            {name: "Alluring", weight: 2},
            {name: "Armed", weight: 2},
            {name: "Armored", weight: 2},
            {name: "Athletic", weight: 2},
            {name: "Attractive", weight: 3},
            {name: "Augmented", weight: 2},
            {name: "Concealed", weight: 2},
            {name: "Distracted", weight: 3},
            {name: "Eccentric", weight: 3},
            {name: "Energetic", weight: 2},
            {name: "Flashy", weight: 2},
            {name: "Graceful", weight: 3},
            {name: "Grim", weight: 3},
            {name: "Haggard", weight: 2},
            {name: "Ill-equipped", weight: 3},
            {name: "Imposing", weight: 3},
            {name: "Large", weight: 3},
            {name: "Mutated", weight: 2},
            {name: "Plain", weight: 3},
            {name: "Poised", weight: 2},
            {name: "Scarred", weight: 3},
            {name: "Scruffy", weight: 3},
            {name: "Shifty", weight: 3},
            {name: "Sickly", weight: 2},
            {name: "Slight", weight: 3},
            {name: "Swaggering", weight: 2},
            {name: "Tattooed", weight: 3},
            {name: "Threatened", weight: 2},
            {name: "Uncanny", weight: 2},
            {name: "Visibly disabled", weight: 2},
            {name: "Weathered", weight: 3},
            {name: "Well-equipped", weight: 2},
            {name: "Wiry", weight: 3},
            {name: "Wounded", weight: 2},
            {name: "Youthful", weight: 3}
        ]);

// NPC-Initial-Disposition
        createTable("NPC-Initial-Disposition", [
            {name: "Helpful", weight: 6},
            {name: "Friendly", weight: 8},
            {name: "Cooperative", weight: 8},
            {name: "Curious", weight: 8},
            {name: "Indifferent", weight: 10},
            {name: "Suspicious", weight: 10},
            {name: "Wanting", weight: 10},
            {name: "Desperate", weight: 10},
            {name: "Demanding", weight: 8},
            {name: "Unfriendly", weight: 8},
            {name: "Threatening", weight: 8},
            {name: "Hostile", weight: 6}
        ]);

// NPC-Role
createTable("NPC-Role", [
    {name: "Agent", weight: 2},
    {name: "AI", weight: 2},
    {name: "Artisan", weight: 2},
    {name: "Assassin", weight: 2},
    {name: "Bounty Hunter", weight: 2},
    {name: "Courier", weight: 2},
    {name: "Crew", weight: 2},
    {name: "Criminal", weight: 2},
    {name: "Cultist", weight: 2},
    {name: "Diplomat", weight: 2},
    {name: "Engineer", weight: 2},
    {name: "Entertainer", weight: 2},
    {name: "Explorer", weight: 2},
    {name: "Farmer", weight: 2},
    {name: "Fugitive", weight: 2},
    {name: "Guard", weight: 2},
    {name: "Guide", weight: 2},
    {name: "Healer", weight: 2},
    {name: "Historian", weight: 2},
    {name: "Hunter", weight: 2},
    {name: "Investigator", weight: 2},
    {name: "Laborer", weight: 2},
    {name: "Lawkeeper", weight: 2},
    {name: "Leader", weight: 2},
    {name: "Mercenary", weight: 2},
    {name: "Merchant", weight: 2},
    {name: "Miner", weight: 2},
    {name: "Mystic", weight: 2},
    {name: "Navigator", weight: 2},
    {name: "Outcast", weight: 2},
    {name: "Pilgrim", weight: 2},
    {name: "Pilot", weight: 2},
    {name: "Pirate", weight: 2},
    {name: "Preacher", weight: 2},
    {name: "Prophet", weight: 2},
    {name: "Raider", weight: 2},
    {name: "Researcher", weight: 2},
    {name: "Scavenger", weight: 2},
    {name: "Scholar", weight: 2},
    {name: "Scout", weight: 2},
    {name: "Shipwright", weight: 2},
    {name: "Smuggler", weight: 2},
    {name: "Soldier", weight: 2},
    {name: "Spacer", weight: 2},
    {name: "Technician", weight: 2},
    {name: "Thief", weight: 2},
    {name: "Action + Theme", weight: 3},
    {name: "Roll twice", weight: 5}
]);

// NPC-Goal
createTable("NPC-Goal", [
    {name: "Avenge a wrong", weight: 2},
    {name: "Build a home", weight: 2},
    {name: "Build a relationship", weight: 3},
    {name: "Claim a resource", weight: 3},
    {name: "Collect a debt", weight: 2},
    {name: "Craft an object", weight: 2},
    {name: "Cure an ill", weight: 2},
    {name: "Defeat a rival", weight: 2},
    {name: "Defend a person", weight: 2},
    {name: "Defend a place", weight: 3},
    {name: "Discover a truth", weight: 2},
    {name: "End a conflict", weight: 2},
    {name: "Escape a captor", weight: 2},
    {name: "Fight injustice", weight: 2},
    {name: "Find a person", weight: 2},
    {name: "Forge an alliance", weight: 2},
    {name: "Gain knowledge", weight: 2},
    {name: "Gain riches", weight: 2},
    {name: "Maintain order", weight: 2},
    {name: "Make an agreement", weight: 2},
    {name: "Obtain an object", weight: 2},
    {name: "Pay a debt", weight: 2},
    {name: "Protect a lifeform", weight: 2},
    {name: "Protect a secret", weight: 2},
    {name: "Prove worthiness", weight: 2},
    {name: "Rebel against power", weight: 2},
    {name: "Refute a falsehood", weight: 2},
    {name: "Repair a technology", weight: 2},
    {name: "Resolve a dispute", weight: 2},
    {name: "Restore a relationship", weight: 2},
    {name: "Sabotage a technology", weight: 2},
    {name: "Secure a resource", weight: 3},
    {name: "Seek redemption", weight: 2},
    {name: "Seize power", weight: 2},
    {name: "Solve a mystery", weight: 2},
    {name: "Spread faith", weight: 2},
    {name: "Travel to a place", weight: 2},
    {name: "Undermine a relationship", weight: 2},
    {name: "Action + Theme", weight: 2},
    {name: "Roll twice", weight: 10}
]);

// NPC-Revealed-Character-Aspect
createTable("NPC-Revealed-Character-Aspect", [
    {name: "Addicted", weight: 1},
    {name: "Adventurous", weight: 1},
    {name: "Afflicted", weight: 1},
    {name: "Aggressive", weight: 1},
    {name: "Ambitious", weight: 1},
    {name: "Angry", weight: 1},
    {name: "Anxious", weight: 1},
    {name: "Apathetic", weight: 1},
    {name: "Bitter", weight: 1},
    {name: "Boastful", weight: 1},
    {name: "Boisterous", weight: 1},
    {name: "Bold", weight: 1},
    {name: "Brave", weight: 1},
    {name: "Careless", weight: 1},
    {name: "Cautious", weight: 1},
    {name: "Charismatic", weight: 1},
    {name: "Clever", weight: 1},
    {name: "Conceited", weight: 1},
    {name: "Confident", weight: 1},
    {name: "Confused", weight: 1},
    {name: "Connected", weight: 1},
    {name: "Corrupted", weight: 1},
    {name: "Cowardly", weight: 1},
    {name: "Creative", weight: 1},
    {name: "Critical", weight: 1},
    {name: "Cruel", weight: 1},
    {name: "Cunning", weight: 1},
    {name: "Dangerous", weight: 1},
    {name: "Deceitful", weight: 1},
    {name: "Defiant", weight: 1},
    {name: "Determined", weight: 1},
    {name: "Disabled", weight: 1},
    {name: "Doomed", weight: 1},
    {name: "Driven", weight: 1},
    {name: "Dying", weight: 1},
    {name: "Envious", weight: 1},
    {name: "Experienced", weight: 1},
    {name: "Faithful", weight: 1},
    {name: "Generous", weight: 1},
    {name: "Gifted", weight: 1},
    {name: "Greedy", weight: 1},
    {name: "Grief-stricken", weight: 1},
    {name: "Handy", weight: 1},
    {name: "Hardhearted", weight: 1},
    {name: "Haunted", weight: 1},
    {name: "Honorable", weight: 1},
    {name: "Hot-tempered", weight: 1},
    {name: "Impulsive", weight: 1},
    {name: "Incompetent", weight: 1},
    {name: "Independent", weight: 1},
    {name: "Infamous", weight: 1},
    {name: "Influential", weight: 1},
    {name: "Insensitive", weight: 1},
    {name: "Insightful", weight: 1},
    {name: "Intelligent", weight: 1},
    {name: "Intolerant", weight: 1},
    {name: "Ironsworn", weight: 1},
    {name: "Kind", weight: 1},
    {name: "Law-abiding", weight: 1},
    {name: "Lonely", weight: 1},
    {name: "Loving", weight: 1},
    {name: "Loyal", weight: 1},
    {name: "Manipulative", weight: 1},
    {name: "Oblivious", weight: 1},
    {name: "Obsessed", weight: 1},
    {name: "Oppressed", weight: 1},
    {name: "Passive", weight: 1},
    {name: "Powerful", weight: 1},
    {name: "Proud", weight: 1},
    {name: "Quiet", weight: 1},
    {name: "Quirky", weight: 1},
    {name: "Rebellious", weight: 1},
    {name: "Reclusive", weight: 1},
    {name: "Relaxed", weight: 1},
    {name: "Remorseful", weight: 1},
    {name: "Resourceful", weight: 1},
    {name: "Secretive", weight: 1},
    {name: "Selfish", weight: 1},
    {name: "Sociable", weight: 1},
    {name: "Stealthy", weight: 1},
    {name: "Stern", weight: 1},
    {name: "Stingy", weight: 1},
    {name: "Stoic", weight: 1},
    {name: "Strong", weight: 1},
    {name: "Stubborn", weight: 1},
    {name: "Successful", weight: 1},
    {name: "Suspicious", weight: 1},
    {name: "Talented", weight: 1},
    {name: "Technical", weight: 1},
    {name: "Timid", weight: 1},
    {name: "Tolerant", weight: 1},
    {name: "Tough", weight: 1},
    {name: "Vengeful", weight: 1},
    {name: "Violent", weight: 1},
    {name: "Wary", weight: 1},
    {name: "Watchful", weight: 1},
    {name: "Weak", weight: 1},
    {name: "Weary", weight: 1},
    {name: "Wild", weight: 1},
    {name: "Wise", weight: 1}
]);

// Core-Action
createTable("Core-Action", [
    {name: "Abandon", weight: 1},
    {name: "Acquire", weight: 1},
    {name: "Advance", weight: 1},
    {name: "Affect", weight: 1},
    {name: "Aid", weight: 1},
    {name: "Arrive", weight: 1},
    {name: "Assault", weight: 1},
    {name: "Attack", weight: 1},
    {name: "Avenge", weight: 1},
    {name: "Avoid", weight: 1},
    {name: "Await", weight: 1},
    {name: "Begin", weight: 1},
    {name: "Betray", weight: 1},
    {name: "Bolster", weight: 1},
    {name: "Breach", weight: 1},
    {name: "Break", weight: 1},
    {name: "Capture", weight: 1},
    {name: "Challenge", weight: 1},
    {name: "Change", weight: 1},
    {name: "Charge", weight: 1},
    {name: "Clash", weight: 1},
    {name: "Command", weight: 1},
    {name: "Communicate", weight: 1},
    {name: "Construct", weight: 1},
    {name: "Control", weight: 1},
    {name: "Coordinate", weight: 1},
    {name: "Create", weight: 1},
    {name: "Debate", weight: 1},
    {name: "Defeat", weight: 1},
    {name: "Defend", weight: 1},
    {name: "Deflect", weight: 1},
    {name: "Defy", weight: 1},
    {name: "Deliver", weight: 1},
    {name: "Demand", weight: 1},
    {name: "Depart", weight: 1},
    {name: "Destroy", weight: 1},
    {name: "Distract", weight: 1},
    {name: "Eliminate", weight: 1},
    {name: "Endure", weight: 1},
    {name: "Escalate", weight: 1},
    {name: "Escort", weight: 1},
    {name: "Evade", weight: 1},
    {name: "Explore", weight: 1},
    {name: "Falter", weight: 1},
    {name: "Find", weight: 1},
    {name: "Finish", weight: 1},
    {name: "Focus", weight: 1},
    {name: "Follow", weight: 1},
    {name: "Fortify", weight: 1},
    {name: "Gather", weight: 1},
    {name: "Guard", weight: 1},
    {name: "Hide", weight: 1},
    {name: "Hold", weight: 1},
    {name: "Hunt", weight: 1},
    {name: "Impress", weight: 1},
    {name: "Initiate", weight: 1},
    {name: "Inspect", weight: 1},
    {name: "Investigate", weight: 1},
    {name: "Journey", weight: 1},
    {name: "Learn", weight: 1},
    {name: "Leave", weight: 1},
    {name: "Locate", weight: 1},
    {name: "Lose", weight: 1},
    {name: "Manipulate", weight: 1},
    {name: "Mourn", weight: 1},
    {name: "Move", weight: 1},
    {name: "Oppose", weight: 1},
    {name: "Overwhelm", weight: 1},
    {name: "Persevere", weight: 1},
    {name: "Preserve", weight: 1},
    {name: "Protect", weight: 1},
    {name: "Raid", weight: 1},
    {name: "Reduce", weight: 1},
    {name: "Refuse", weight: 1},
    {name: "Reject", weight: 1},
    {name: "Release", weight: 1},
    {name: "Remove", weight: 1},
    {name: "Research", weight: 1},
    {name: "Resist", weight: 1},
    {name: "Restore", weight: 1},
    {name: "Reveal", weight: 1},
    {name: "Risk", weight: 1},
    {name: "Scheme", weight: 1},
    {name: "Search", weight: 1},
    {name: "Secure", weight: 1},
    {name: "Seize", weight: 1},
    {name: "Serve", weight: 1},
    {name: "Share", weight: 1},
    {name: "Strengthen", weight: 1},
    {name: "Summon", weight: 1},
    {name: "Support", weight: 1},
    {name: "Suppress", weight: 1},
    {name: "Surrender", weight: 1},
    {name: "Swear", weight: 1},
    {name: "Threaten", weight: 1},
    {name: "Transform", weight: 1},
    {name: "Uncover", weight: 1},
    {name: "Uphold", weight: 1},
    {name: "Weaken", weight: 1},
    {name: "Withdraw", weight: 1}
]);

// Core-Theme
createTable("Core-Theme", [
    {name: "Ability", weight: 1},
    {name: "Advantage", weight: 1},
    {name: "Alliance", weight: 1},
    {name: "Authority", weight: 1},
    {name: "Balance", weight: 1},
    {name: "Barrier", weight: 1},
    {name: "Belief", weight: 1},
    {name: "Blood", weight: 1},
    {name: "Bond", weight: 1},
    {name: "Burden", weight: 1},
    {name: "Commerce", weight: 1},
    {name: "Community", weight: 1},
    {name: "Corruption", weight: 1},
    {name: "Creation", weight: 1},
    {name: "Crime", weight: 1},
    {name: "Culture", weight: 1},
    {name: "Cure", weight: 1},
    {name: "Danger", weight: 1},
    {name: "Death", weight: 1},
    {name: "Debt", weight: 1},
    {name: "Decay", weight: 1},
    {name: "Deception", weight: 1},
    {name: "Defense", weight: 1},
    {name: "Destiny", weight: 1},
    {name: "Disaster", weight: 1},
    {name: "Discovery", weight: 1},
    {name: "Disease", weight: 1},
    {name: "Dominion", weight: 1},
    {name: "Dream", weight: 1},
    {name: "Duty", weight: 1},
    {name: "Enemy", weight: 1},
    {name: "Expedition", weight: 1},
    {name: "Faction", weight: 1},
    {name: "Fame", weight: 1},
    {name: "Family", weight: 1},
    {name: "Fear", weight: 1},
    {name: "Fellowship", weight: 1},
    {name: "Freedom", weight: 1},
    {name: "Greed", weight: 1},
    {name: "Hardship", weight: 1},
    {name: "Hate", weight: 1},
    {name: "Health", weight: 1},
    {name: "History", weight: 1},
    {name: "Home", weight: 1},
    {name: "Honor", weight: 1},
    {name: "Hope", weight: 1},
    {name: "Humanity", weight: 1},
    {name: "Innocence", weight: 1},
    {name: "Knowledge", weight: 1},
    {name: "Labor", weight: 1},
    {name: "Language", weight: 1},
    {name: "Law", weight: 1},
    {name: "Legacy", weight: 1},
    {name: "Life", weight: 1},
    {name: "Love", weight: 1},
    {name: "Memory", weight: 1},
    {name: "Nature", weight: 1},
    {name: "Opportunity", weight: 1},
    {name: "Passage", weight: 1},
    {name: "Peace", weight: 1},
    {name: "Phenomenon", weight: 1},
    {name: "Possession", weight: 1},
    {name: "Power", weight: 1},
    {name: "Price", weight: 1},
    {name: "Pride", weight: 1},
    {name: "Prize", weight: 1},
    {name: "Prophesy", weight: 1},
    {name: "Protection", weight: 1},
    {name: "Quest", weight: 1},
    {name: "Relationship", weight: 1},
    {name: "Religion", weight: 1},
    {name: "Reputation", weight: 1},
    {name: "Resource", weight: 1},
    {name: "Revenge", weight: 1},
    {name: "Rival", weight: 1},
    {name: "Rumor", weight: 1},
    {name: "Safety", weight: 1},
    {name: "Sanctuary", weight: 1},
    {name: "Secret", weight: 1},
    {name: "Solution", weight: 1},
    {name: "Spirit", weight: 1},
    {name: "Stranger", weight: 1},
    {name: "Strategy", weight: 1},
    {name: "Strength", weight: 1},
    {name: "Superstition", weight: 1},
    {name: "Supply", weight: 1},
    {name: "Survival", weight: 1},
    {name: "Technology", weight: 1},
    {name: "Time", weight: 1},
    {name: "Tool", weight: 1},
    {name: "Trade", weight: 1},
    {name: "Truth", weight: 1},
    {name: "Vengeance", weight: 1},
    {name: "Vow", weight: 1},
    {name: "War", weight: 1},
    {name: "Warning", weight: 1},
    {name: "Weakness", weight: 1},
    {name: "Wealth", weight: 1},
    {name: "Weapon", weight: 1},
    {name: "World", weight: 1}
]);

// Core-Descriptor
createTable("Core-Descriptor", [
    {name: "Abandoned", weight: 1},
    {name: "Abundant", weight: 1},
    {name: "Active", weight: 1},
    {name: "Advanced", weight: 1},
    {name: "Alien", weight: 1},
    {name: "Ancient", weight: 1},
    {name: "Archaic", weight: 1},
    {name: "Automated", weight: 1},
    {name: "Barren", weight: 1},
    {name: "Biological", weight: 1},
    {name: "Blighted", weight: 1},
    {name: "Blocked", weight: 1},
    {name: "Breached", weight: 1},
    {name: "Broken", weight: 1},
    {name: "Captured", weight: 1},
    {name: "Chaotic", weight: 1},
    {name: "Civilized", weight: 1},
    {name: "Collapsed", weight: 1},
    {name: "Colossal", weight: 1},
    {name: "Confined", weight: 1},
    {name: "Conspicuous", weight: 1},
    {name: "Constructed", weight: 1},
    {name: "Contested", weight: 1},
    {name: "Corrupted", weight: 1},
    {name: "Created", weight: 1},
    {name: "Damaged", weight: 1},
    {name: "Dead", weight: 1},
    {name: "Deadly", weight: 1},
    {name: "Decaying", weight: 1},
    {name: "Defended", weight: 1},
    {name: "Depleted", weight: 1},
    {name: "Desolate", weight: 1},
    {name: "Destroyed", weight: 1},
    {name: "Diverse", weight: 1},
    {name: "Empty", weight: 1},
    {name: "Engulfed", weight: 1},
    {name: "Ensnaring", weight: 1},
    {name: "Expansive", weight: 1},
    {name: "Exposed", weight: 1},
    {name: "Fiery", weight: 1},
    {name: "Foreboding", weight: 1},
    {name: "Forgotten", weight: 1},
    {name: "Forsaken", weight: 1},
    {name: "Fortified", weight: 1},
    {name: "Foul", weight: 1},
    {name: "Fragile", weight: 1},
    {name: "Frozen", weight: 1},
    {name: "Functional", weight: 1},
    {name: "Grim", weight: 1},
    {name: "Guarded", weight: 1},
    {name: "Haunted", weight: 1},
    {name: "Hidden", weight: 1},
    {name: "Hoarded", weight: 1},
    {name: "Hostile", weight: 1},
    {name: "Immersed", weight: 1},
    {name: "Inaccessible", weight: 1},
    {name: "Infested", weight: 1},
    {name: "Inhabited", weight: 1},
    {name: "Isolated", weight: 1},
    {name: "Living", weight: 1},
    {name: "Lost", weight: 1},
    {name: "Lush", weight: 1},
    {name: "Makeshift", weight: 1},
    {name: "Mechanical", weight: 1},
    {name: "Misleading", weight: 1},
    {name: "Moving", weight: 1},
    {name: "Mysterious", weight: 1},
    {name: "Natural", weight: 1},
    {name: "New", weight: 1},
    {name: "Obscured", weight: 1},
    {name: "Open", weight: 1},
    {name: "Peaceful", weight: 1},
    {name: "Perilous", weight: 1},
    {name: "Pillaged", weight: 1},
    {name: "Powerful", weight: 1},
    {name: "Preserved", weight: 1},
    {name: "Prominent", weight: 1},
    {name: "Protected", weight: 1},
    {name: "Radiant", weight: 1},
    {name: "Rare", weight: 1},
    {name: "Remote", weight: 1},
    {name: "Rich", weight: 1},
    {name: "Ruined", weight: 1},
    {name: "Sacred", weight: 1},
    {name: "Safe", weight: 1},
    {name: "Sealed", weight: 1},
    {name: "Secret", weight: 1},
    {name: "Settled", weight: 1},
    {name: "Shrouded", weight: 1},
    {name: "Stolen", weight: 1},
    {name: "Strange", weight: 1},
    {name: "Subsurface", weight: 1},
    {name: "Toxic", weight: 1},
    {name: "Trapped", weight: 1},
    {name: "Undiscovered", weight: 1},
    {name: "Unnatural", weight: 1},
    {name: "Unstable", weight: 1},
    {name: "Untamed", weight: 1},
    {name: "Valuable", weight: 1},
    {name: "Violent", weight: 1}
]);

// Core-Focus
createTable("Core-Focus", [
    {name: "Alarm", weight: 1},
    {name: "Anomaly", weight: 1},
    {name: "Apparition", weight: 1},
    {name: "Archive", weight: 1},
    {name: "Art", weight: 1},
    {name: "Artifact", weight: 1},
    {name: "Atmosphere", weight: 1},
    {name: "Battleground", weight: 1},
    {name: "Beacon", weight: 1},
    {name: "Being", weight: 1},
    {name: "Blockade", weight: 1},
    {name: "Boundary", weight: 1},
    {name: "Cache", weight: 1},
    {name: "Cargo", weight: 1},
    {name: "Commodity", weight: 1},
    {name: "Confinement", weight: 1},
    {name: "Connection", weight: 1},
    {name: "Container", weight: 1},
    {name: "Creation", weight: 1},
    {name: "Creature", weight: 1},
    {name: "Crossing", weight: 1},
    {name: "Data", weight: 1},
    {name: "Debris", weight: 1},
    {name: "Device", weight: 1},
    {name: "Dimension", weight: 1},
    {name: "Discovery", weight: 1},
    {name: "Ecosystem", weight: 1},
    {name: "Enclosure", weight: 1},
    {name: "Energy", weight: 1},
    {name: "Environment", weight: 1},
    {name: "Equipment", weight: 1},
    {name: "Experiment", weight: 1},
    {name: "Facility", weight: 1},
    {name: "Faction", weight: 1},
    {name: "Fleet", weight: 1},
    {name: "Force", weight: 1},
    {name: "Fortification", weight: 1},
    {name: "Gas", weight: 1},
    {name: "Grave", weight: 1},
    {name: "Habitat", weight: 1},
    {name: "Hazard", weight: 1},
    {name: "Hideaway", weight: 1},
    {name: "Home", weight: 1},
    {name: "Illusion", weight: 1},
    {name: "Industry", weight: 1},
    {name: "Intelligence", weight: 1},
    {name: "Lair", weight: 1},
    {name: "Lifeform", weight: 1},
    {name: "Liquid", weight: 1},
    {name: "Machine", weight: 1},
    {name: "Material", weight: 1},
    {name: "Mechanism", weight: 1},
    {name: "Message", weight: 1},
    {name: "Mineral", weight: 1},
    {name: "Monument", weight: 1},
    {name: "Obstacle", weight: 1},
    {name: "Organism", weight: 1},
    {name: "Outbreak", weight: 1},
    {name: "Outpost", weight: 1},
    {name: "Path", weight: 1},
    {name: "People", weight: 1},
    {name: "Person", weight: 1},
    {name: "Plant", weight: 1},
    {name: "Portal", weight: 1},
    {name: "Reality", weight: 1},
    {name: "Refuge", weight: 1},
    {name: "Relic", weight: 1},
    {name: "Remains", weight: 1},
    {name: "Rendezvous", weight: 1},
    {name: "Resource", weight: 1},
    {name: "Route", weight: 1},
    {name: "Ruins", weight: 1},
    {name: "Salvage", weight: 1},
    {name: "Settlement", weight: 1},
    {name: "Shelter", weight: 1},
    {name: "Ship", weight: 1},
    {name: "Shortcut", weight: 1},
    {name: "Signal", weight: 1},
    {name: "Sound", weight: 1},
    {name: "Storage", weight: 1},
    {name: "Storm", weight: 1},
    {name: "Structure", weight: 1},
    {name: "Supply", weight: 1},
    {name: "Symbol", weight: 1},
    {name: "System", weight: 1},
    {name: "Technology", weight: 1},
    {name: "Terrain", weight: 1},
    {name: "Territory", weight: 1},
    {name: "Threshold", weight: 1},
    {name: "Time", weight: 1},
    {name: "Transport", weight: 1},
    {name: "Trap", weight: 1},
    {name: "Treasure", weight: 1},
    {name: "Vault", weight: 1},
    {name: "Vehicle", weight: 1},
    {name: "Viewpoint", weight: 1},
    {name: "Void", weight: 1},
    {name: "Weapon", weight: 1},
    {name: "World", weight: 1},
    {name: "Wreckage", weight: 1}
]);

// Planet-Lifebearing-Peril
createTable("Planet-Lifebearing-Peril", [
    {name: "Corrupted or mutated lifeform", weight: 3},
    {name: "Signs of a lifeform's power or cunning", weight: 3},
    {name: "Hazardous plant life or malignant spores", weight: 3},
    {name: "Lifeform hunts for prey", weight: 3},
    {name: "Lifeform lairs here", weight: 3},
    {name: "Lifeforms guided by a greater threat", weight: 3},
    {name: "Lifeforms spooked or stampeding", weight: 3},
    {name: "Threatening lifeform draws near", weight: 3},
    {name: "Life is revealed or takes an unexpected form", weight: 3},
    {name: "Blocked or impassible path", weight: 3},
    {name: "Corrosive substance or environment", weight: 3},
    {name: "Disturbing remains or evidence of death", weight: 3},
    {name: "Drastic environmental change", weight: 3},
    {name: "Enemy holds this area", weight: 3},
    {name: "Entangling or engulfing hazard", weight: 3},
    {name: "Equipment fails or malfunctions", weight: 3},
    {name: "Guarded or patrolled path", weight: 3},
    {name: "Led astray", weight: 3},
    {name: "Lost the path", weight: 3},
    {name: "Meteorites fall from the sky", weight: 3},
    {name: "Irradiated area or object", weight: 3},
    {name: "Realization that something was left behind", weight: 3},
    {name: "Seismic or volcanic upheaval", weight: 3},
    {name: "Signs of a lurking or trailing foe", weight: 3},
    {name: "Storm or atmospheric disruption", weight: 3},
    {name: "Toxic or sickening environment", weight: 3},
    {name: "Trap or alarm", weight: 3},
    {name: "Treacherous or arduous path", weight: 3},
    {name: "Troubling visions or apparitions", weight: 3},
    {name: "Visibility hindered by atmospheric effects", weight: 3},
    {name: "Worrying arrival of a ship or vehicle", weight: 3},
    {name: "Wreckage or ruins portend a new threat", weight: 3},
    {name: "▸Action + Theme", weight: 3},
    {name: "Roll twice", weight: 1}
]);

// Planet-Lifeless-Peril
createTable("Planet-Lifeless-Peril", [
    {name: "Life is revealed or takes an unexpected form", weight: 3},
    {name: "Blocked or impassible path", weight: 4},
    {name: "Corrosive substance or environment", weight: 4},
    {name: "Disturbing remains or evidence of death", weight: 4},
    {name: "Drastic environmental change", weight: 4},
    {name: "Enemy holds this area", weight: 4},
    {name: "Entangling or engulfing hazard", weight: 4},
    {name: "Equipment fails or malfunctions", weight: 4},
    {name: "Guarded or patrolled path", weight: 4},
    {name: "Led astray", weight: 4},
    {name: "Lost the path", weight: 4},
    {name: "Meteorites fall from the sky", weight: 4},
    {name: "Irradiated area or object", weight: 4},
    {name: "Realization that something was left behind", weight: 4},
    {name: "Seismic or volcanic upheaval", weight: 4},
    {name: "Signs of a lurking or trailing foe", weight: 4},
    {name: "Storm or atmospheric disruption", weight: 4},
    {name: "Toxic or sickening environment", weight: 4},
    {name: "Trap or alarm", weight: 4},
    {name: "Treacherous or arduous path", weight: 4},
    {name: "Troubling visions or apparitions", weight: 4},
    {name: "Visibility hindered by atmospheric effects", weight: 4},
    {name: "Worrying arrival of a ship or vehicle", weight: 4},
    {name: "Wreckage or ruins portend a new threat", weight: 4},
    {name: "▸Action + Theme", weight: 4},
    {name: "Roll twice", weight: 1}
]);

// Planet-Lifebearing-Opportunity
createTable("Planet-Lifebearing-Opportunity", [
    {name: "Clue to a lifeform's nature or vulnerabilities", weight: 1},
    {name: "Friendly interaction with a benign lifeform", weight: 1},
    {name: "Hunting or foraging opportunities are plentiful", weight: 1},
    {name: "Interesting or helpful aspect of benign creatures", weight: 1},
    {name: "Interesting or helpful aspect of local plant life", weight: 1},
    {name: "Encounter reveals unexpected benign lifeforms", weight: 1},
    {name: "Abandoned camp or vehicle", weight: 1},
    {name: "Advance warning of an environmental threat", weight: 1},
    {name: "Clear path through otherwise perilous terrain", weight: 1},
    {name: "Clue offers insight into a current quest or mystery", weight: 1},
    {name: "Clue to the history or nature of this place", weight: 1},
    {name: "Evidence that others have passed this way", weight: 1},
    {name: "Foe reveals themselves or tips their hand", weight: 1},
    {name: "Fortuitous change in the weather or atmosphere", weight: 1},
    {name: "Friendly traveler crosses your path", weight: 1},
    {name: "Helpful resource is in ample supply", weight: 1},
    {name: "Impressive vista offers comfort or inspiration", weight: 1},
    {name: "Interesting artifact or device", weight: 1},
    {name: "Interesting site offers opportunities for exploration", weight: 1},
    {name: "Moment of fellowship or inner peace", weight: 1},
    {name: "Opening to distract, escape, or avoid foes", weight: 1},
    {name: "Opening to get the drop on a foe", weight: 1},
    {name: "Plea for help from a potential benefactor", weight: 1},
    {name: "Refuge offers a place to hide, plan, or recover", weight: 1},
    {name: "Vantage point reveals the lay of the land", weight: 1}
]);

// Planet-Lifeless-Opportunity
createTable("Planet-Lifeless-Opportunity", [
    {name: "Encounter reveals unexpected benign lifeforms", weight: 1},
    {name: "Abandoned camp or vehicle", weight: 1},
    {name: "Advance warning of an environmental threat", weight: 1},
    {name: "Clear path through otherwise perilous terrain", weight: 1},
    {name: "Clue offers insight into a current quest or mystery", weight: 1},
    {name: "Clue to the history or nature of this place", weight: 1},
    {name: "Evidence that others have passed this way", weight: 1},
    {name: "Foe reveals themselves or tips their hand", weight: 1},
    {name: "Fortuitous change in the weather or atmosphere", weight: 1},
    {name: "Friendly traveler crosses your path", weight: 1},
    {name: "Helpful resource is in ample supply", weight: 1},
    {name: "Impressive vista offers comfort or inspiration", weight: 1},
    {name: "Interesting artifact or device", weight: 1},
    {name: "Interesting site offers opportunities for exploration", weight: 1},
    {name: "Moment of fellowship or inner peace", weight: 1},
    {name: "Opening to distract, escape, or avoid foes", weight: 1},
    {name: "Opening to get the drop on a foe", weight: 1},
    {name: "Plea for help from a potential benefactor", weight: 1},
    {name: "Refuge offers a place to hide, plan, or recover", weight: 1},
    {name: "Vantage point reveals the lay of the land", weight: 1}
]);

// Planet-Desert-World-Atmosphere
createTable("Planet-Desert-World-Atmosphere", [
    {name: "None / thin (This planet is airless, or its atmosphere is so thin as to be useless for humans.)", weight: 10},
    {name: "Toxic (This planet's atmosphere is not compatible with human life. Exploring this place will require a sealed environment or breathing apparatus. Otherwise, survival is measured in minutes.)", weight: 15},
    {name: "Corrosive (This planet's atmosphere is deadly to humans. As a bonus, it can damage exposed skin, materials, plastics, and metals over time.)", weight: 15},
    {name: "Marginal (It's unhealthy to breathe this planet's atmosphere for more than a few hours at a time.)", weight: 30},
    {name: "Breathable (This atmosphere is not perfect, but it's good enough to sustain human life.)", weight: 25},
    {name: "Ideal (This planet's atmosphere is ideally suited to human life. It's literally a breath of fresh air.)", weight: 5}
]);

// Planet-Furnace-World-Atmosphere
createTable("Planet-Furnace-World-Atmosphere", [
    {name: "None / thin (This planet is airless, or its atmosphere is so thin as to be useless for humans.)", weight: 10},
    {name: "Toxic (This planet's atmosphere is not compatible with human life. Exploring this place will require a sealed environment or breathing apparatus. Otherwise, survival is measured in minutes.)", weight: 40},
    {name: "Corrosive (This planet's atmosphere is deadly to humans. As a bonus, it can damage exposed skin, materials, plastics, and metals over time.)", weight: 15},
    {name: "Marginal (It's unhealthy to breathe this planet's atmosphere for more than a few hours at a time.)", weight: 25},
    {name: "Breathable (This atmosphere is not perfect, but it's good enough to sustain human life.)", weight: 10}
]);

// Planet-Grave-World-Atmosphere
createTable("Planet-Grave-World-Atmosphere", [
    {name: "None / thin (This planet is airless, or its atmosphere is so thin as to be useless for humans.)", weight: 10},
    {name: "Toxic (This planet's atmosphere is not compatible with human life. Exploring this place will require a sealed environment or breathing apparatus. Otherwise, survival is measured in minutes.)", weight: 35},
    {name: "Corrosive (This planet's atmosphere is deadly to humans. As a bonus, it can damage exposed skin, materials, plastics, and metals over time.)", weight: 25},
    {name: "Marginal (It's unhealthy to breathe this planet's atmosphere for more than a few hours at a time.)", weight: 20},
    {name: "Breathable (This atmosphere is not perfect, but it's good enough to sustain human life.)", weight: 10}
]);

// Planet-Ice-World-Atmosphere
createTable("Planet-Ice-World-Atmosphere", [
    {name: "None / thin (This planet is airless, or its atmosphere is so thin as to be useless for humans.)", weight: 15},
    {name: "Toxic (This planet's atmosphere is not compatible with human life. Exploring this place will require a sealed environment or breathing apparatus. Otherwise, survival is measured in minutes.)", weight: 20},
    {name: "Corrosive (This planet's atmosphere is deadly to humans. As a bonus, it can damage exposed skin, materials, plastics, and metals over time.)", weight: 5},
    {name: "Marginal (It's unhealthy to breathe this planet's atmosphere for more than a few hours at a time.)", weight: 30},
    {name: "Breathable (This atmosphere is not perfect, but it's good enough to sustain human life.)", weight: 25},
    {name: "Ideal (This planet's atmosphere is ideally suited to human life. It's literally a breath of fresh air.)", weight: 5}
]);

// Planet-Jovian-World-Atmosphere
createTable("Planet-Jovian-World-Atmosphere", [
    {name: "Toxic (This planet's atmosphere is not compatible with human life. Exploring this place will require a sealed environment or breathing apparatus. Otherwise, survival is measured in minutes.)", weight: 50},
    {name: "Corrosive (This planet's atmosphere is deadly to humans. As a bonus, it can damage exposed skin, materials, plastics, and metals over time.)", weight: 15},
    {name: "Marginal (It's unhealthy to breathe this planet's atmosphere for more than a few hours at a time.)", weight: 20},
    {name: "Breathable (This atmosphere is not perfect, but it's good enough to sustain human life.)", weight: 15}
]);

// Planet-Jungle-World-Atmosphere
createTable("Planet-Jungle-World-Atmosphere", [
    {name: "Toxic (This planet's atmosphere is not compatible with human life. Exploring this place will require a sealed environment or breathing apparatus. Otherwise, survival is measured in minutes.)", weight: 25},
    {name: "Corrosive (This planet's atmosphere is deadly to humans. As a bonus, it can damage exposed skin, materials, plastics, and metals over time.)", weight: 5},
    {name: "Marginal (It's unhealthy to breathe this planet's atmosphere for more than a few hours at a time.)", weight: 30},
    {name: "Breathable (This atmosphere is not perfect, but it's good enough to sustain human life.)", weight: 30},
    {name: "Ideal (This planet's atmosphere is ideally suited to human life. It's literally a breath of fresh air.)", weight: 10}
]);

// Planet-Ocean-World-Atmosphere
createTable("Planet-Ocean-World-Atmosphere", [
    {name: "None / thin (This planet is airless, or its atmosphere is so thin as to be useless for humans.)", weight: 5},
    {name: "Toxic (This planet's atmosphere is not compatible with human life. Exploring this place will require a sealed environment or breathing apparatus. Otherwise, survival is measured in minutes.)", weight: 15},
    {name: "Corrosive (This planet's atmosphere is deadly to humans. As a bonus, it can damage exposed skin, materials, plastics, and metals over time.)", weight: 5},
    {name: "Marginal (It's unhealthy to breathe this planet's atmosphere for more than a few hours at a time.)", weight: 35},
    {name: "Breathable (This atmosphere is not perfect, but it's good enough to sustain human life.)", weight: 30},
    {name: "Ideal (This planet's atmosphere is ideally suited to human life. It's literally a breath of fresh air.)", weight: 10}
]);

// Planet-Rocky-World-Atmosphere
createTable("Planet-Rocky-World-Atmosphere", [
    {name: "None / thin (This planet is airless, or its atmosphere is so thin as to be useless for humans.)", weight: 65},
    {name: "Toxic (This planet's atmosphere is not compatible with human life. Exploring this place will require a sealed environment or breathing apparatus. Otherwise, survival is measured in minutes.)", weight: 20},
    {name: "Corrosive (This planet's atmosphere is deadly to humans. As a bonus, it can damage exposed skin, materials, plastics, and metals over time.)", weight: 5},
    {name: "Marginal (It's unhealthy to breathe this planet's atmosphere for more than a few hours at a time.)", weight: 10}
]);

// Planet-Shattered-World-Atmosphere
createTable("Planet-Shattered-World-Atmosphere", [
    {name: "None / thin (This planet is airless, or its atmosphere is so thin as to be useless for humans.)", weight: 93},
    {name: "Toxic (This planet's atmosphere is not compatible with human life. Exploring this place will require a sealed environment or breathing apparatus. Otherwise, survival is measured in minutes.)", weight: 2},
    {name: "Corrosive (This planet's atmosphere is deadly to humans. As a bonus, it can damage exposed skin, materials, plastics, and metals over time.)", weight: 2},
    {name: "Marginal (It's unhealthy to breathe this planet's atmosphere for more than a few hours at a time.)", weight: 2},
    {name: "Breathable (This atmosphere is not perfect, but it's good enough to sustain human life.)", weight: 1}
]);

// Planet-Tainted-World-Atmosphere
createTable("Planet-Tainted-World-Atmosphere", [
    {name: "Toxic (This planet's atmosphere is not compatible with human life. Exploring this place will require a sealed environment or breathing apparatus. Otherwise, survival is measured in minutes.)", weight: 65},
    {name: "Corrosive (This planet's atmosphere is deadly to humans. As a bonus, it can damage exposed skin, materials, plastics, and metals over time.)", weight: 20},
    {name: "Marginal (It's unhealthy to breathe this planet's atmosphere for more than a few hours at a time.)", weight: 10},
    {name: "Breathable (This atmosphere is not perfect, but it's good enough to sustain human life.)", weight: 5}
]);

// Planet-Vital-World-Atmosphere
createTable("Planet-Vital-World-Atmosphere", [
    {name: "Marginal (It's unhealthy to breathe this planet's atmosphere for more than a few hours at a time.)", weight: 20},
    {name: "Breathable (This atmosphere is not perfect, but it's good enough to sustain human life.)", weight: 30},
    {name: "Ideal (This planet's atmosphere is ideally suited to human life. It's literally a breath of fresh air.)", weight: 50}
]);

// Planet-Desert-World-Settlements-Terminus
createTable("Planet-Desert-World-Settlements-Terminus", [
    {name: "None", weight: 50},
    {name: "Orbital settlement", weight: 10},
    {name: "Planetside settlement", weight: 20},
    {name: "Multiple settlements", weight: 12},
    {name: "Settlements in conflict", weight: 8}
]);

// Planet-Desert-World-Settlements-Outlands
createTable("Planet-Desert-World-Settlements-Outlands", [
    {name: "None", weight: 75},
    {name: "Orbital settlement", weight: 8},
    {name: "Planetside settlement", weight: 12},
    {name: "Multiple settlements", weight: 3},
    {name: "Settlements in conflict", weight: 2}
]);

// Planet-Desert-World-Settlements-Expanse
createTable("Planet-Desert-World-Settlements-Expanse", [
    {name: "None", weight: 90},
    {name: "Orbital settlement", weight: 6},
    {name: "Planetside settlement", weight: 4}
]);

// Planet-Desert-World-From-Space
createTable("Planet-Desert-World-From-Space", [
    {name: "Dry seabeds", weight: 11},
    {name: "Expansive dune seas", weight: 11},
    {name: "Massive canyons", weight: 11},
    {name: "Perpetual daylight", weight: 11},
    {name: "Rugged mountains", weight: 11},
    {name: "Sprawling salt flats", weight: 11},
    {name: "Vast plateaus", weight: 11},
    {name: "Vibrant terrain colors", weight: 11},
    {name: "Descriptor + Focus", weight: 10},
    {name: "Precursor Vault (orbital)", weight: 2}
]);

// Planet-Desert-World-Planetside-Feature
createTable("Planet-Desert-World-Planetside-Feature", [
    {name: "Cavernous sinkholes", weight: 7},
    {name: "Engulfing sandstorms", weight: 7},
    {name: "Fleeting rainstorms and flash floods", weight: 7},
    {name: "Flooded grottos", weight: 7},
    {name: "Petrified forest", weight: 7},
    {name: "Rampaging whirlwinds", weight: 7},
    {name: "Scorched glass plains", weight: 7},
    {name: "Severe temperature fluctuations", weight: 7},
    {name: "Sunbaked bones of titanic creatures", weight: 7},
    {name: "Timeworn cliffside caves", weight: 7},
    {name: "Towering rock formations", weight: 7},
    {name: "Violent electrical storms", weight: 7},
    {name: "Windborne metallic sand", weight: 7},
    {name: "Descriptor + Focus", weight: 7},
    {name: "Precursor Vault (planetside)", weight: 2}
]);

// Planet-Desert-World-Life
createTable("Planet-Desert-World-Life", [
    {name: "None", weight: 25},
    {name: "Extinct", weight: 20},
    {name: "Simple", weight: 15},
    {name: "Sparse", weight: 20},
    {name: "Diverse", weight: 10},
    {name: "Bountiful", weight: 7},
    {name: "Overrun", weight: 3}
]);

// Planet-Furnace-World-Settlements-Terminus
createTable("Planet-Furnace-World-Settlements-Terminus", [
    {name: "None", weight: 60},
    {name: "Orbital settlement", weight: 15},
    {name: "Planetside settlement", weight: 12},
    {name: "Multiple settlements", weight: 9},
    {name: "Settlements in conflict", weight: 4}
]);

// Planet-Furnace-World-Settlements-Outlands
createTable("Planet-Furnace-World-Settlements-Outlands", [
    {name: "None", weight: 85},
    {name: "Orbital settlement", weight: 7},
    {name: "Planetside settlement", weight: 5},
    {name: "Multiple settlements", weight: 2},
    {name: "Settlements in conflict", weight: 1}
]);

// Planet-Furnace-World-Settlements-Expanse
createTable("Planet-Furnace-World-Settlements-Expanse", [
    {name: "None", weight: 95},
    {name: "Orbital settlement", weight: 3},
    {name: "Planetside settlement", weight: 2}
]);

// Planet-Furnace-World-From-Space
createTable("Planet-Furnace-World-From-Space", [
    {name: "Fiery world-spanning chasms", weight: 11},
    {name: "Glowing rivers of lava", weight: 11},
    {name: "Lightning-wracked ash clouds", weight: 11},
    {name: "Magma seas", weight: 11},
    {name: "Massive supervolcano", weight: 11},
    {name: "Once verdant terrain", weight: 11},
    {name: "Towering mountain ranges", weight: 11},
    {name: "World-spanning fissures", weight: 11},
    {name: "Descriptor + Focus", weight: 10},
    {name: "Precursor Vault (orbital)", weight: 2}
]);

// Planet-Furnace-World-Planetside-Feature
createTable("Planet-Furnace-World-Planetside-Feature", [
    {name: "Blinding ash storms", weight: 7},
    {name: "Catastrophic earthquakes", weight: 7},
    {name: "Colorful geothermal springs", weight: 7},
    {name: "Intricate volcanic rock formations", weight: 7},
    {name: "Lava tube tunnel networks", weight: 7},
    {name: "Masses of scorched bones", weight: 7},
    {name: "Plains of volcanic glass", weight: 7},
    {name: "Pools of liquid metal", weight: 7},
    {name: "Rocky islands adrift on magma", weight: 7},
    {name: "Roiling clouds of superheated gas", weight: 7},
    {name: "Scalding geysers", weight: 7},
    {name: "Silica or metal storms", weight: 7},
    {name: "Steaming mudflats", weight: 7},
    {name: "Descriptor + Focus", weight: 7},
    {name: "Precursor Vault (planetside)", weight: 2}
]);

// Planet-Furnace-World-Life
createTable("Planet-Furnace-World-Life", [
    {name: "None", weight: 30},
    {name: "Extinct", weight: 20},
    {name: "Simple", weight: 20},
    {name: "Sparse", weight: 15},
    {name: "Diverse", weight: 10},
    {name: "Bountiful", weight: 3},
    {name: "Overrun", weight: 2}
]);

// Planet-Grave-World-Settlements-Terminus
createTable("Planet-Grave-World-Settlements-Terminus", [
    {name: "None", weight: 80},
    {name: "Orbital settlement", weight: 10},
    {name: "Planetside settlement", weight: 5},
    {name: "Multiple settlements", weight: 3},
    {name: "Settlements in conflict", weight: 2}
]);

// Planet-Grave-World-Settlements-Outlands
createTable("Planet-Grave-World-Settlements-Outlands", [
    {name: "None", weight: 90},
    {name: "Orbital settlement", weight: 7},
    {name: "Planetside settlement", weight: 3}
]);

// Planet-Grave-World-Settlements-Expanse
createTable("Planet-Grave-World-Settlements-Expanse", [
    {name: "None", weight: 95},
    {name: "Orbital settlement", weight: 3},
    {name: "Planetside settlement", weight: 2}
]);

// Planet-Grave-World-From-Space
createTable("Planet-Grave-World-From-Space", [
    {name: "Broken moon", weight: 11},
    {name: "Cratered surface", weight: 11},
    {name: "Dry seabeds", weight: 11},
    {name: "Irradiated atmosphere", weight: 11},
    {name: "Orbiting ship graveyard", weight: 11},
    {name: "Perpetual overcast", weight: 11},
    {name: "Sky-breaching ruins", weight: 11},
    {name: "Vast wastelands", weight: 11},
    {name: "Descriptor + Focus", weight: 10},
    {name: "Precursor Vault (orbital)", weight: 2}
]);

// Planet-Grave-World-Planetside-Feature
createTable("Planet-Grave-World-Planetside-Feature", [
    {name: "Acid pools", weight: 7},
    {name: "Ash dunes", weight: 7},
    {name: "Corrosive rains", weight: 7},
    {name: "Dead forests", weight: 7},
    {name: "Fetid mudflats", weight: 7},
    {name: "Mass graves", weight: 7},
    {name: "Moldering bones", weight: 7},
    {name: "Noxious fog", weight: 7},
    {name: "Radioactive hotspots", weight: 7},
    {name: "Ravaged cities", weight: 7},
    {name: "Scarred battlefields", weight: 7},
    {name: "Ship graveyards", weight: 7},
    {name: "Whispers of the dead", weight: 7},
    {name: "Descriptor + Focus", weight: 7},
    {name: "Precursor Vault (planetside)", weight: 2}
]);

// Planet-Grave-World-Life
createTable("Planet-Grave-World-Life", [
    {name: "None", weight: 25},
    {name: "Extinct", weight: 60},
    {name: "Simple", weight: 10},
    {name: "Sparse", weight: 5}
]);

// Planet-Ice-World-Settlements-Terminus
createTable("Planet-Ice-World-Settlements-Terminus", [
    {name: "None", weight: 50},
    {name: "Orbital settlement", weight: 10},
    {name: "Planetside settlement", weight: 20},
    {name: "Multiple settlements", weight: 12},
    {name: "Settlements in conflict", weight: 8}
]);

// Planet-Ice-World-Settlements-Outlands
createTable("Planet-Ice-World-Settlements-Outlands", [
    {name: "None", weight: 75},
    {name: "Orbital settlement", weight: 8},
    {name: "Planetside settlement", weight: 12},
    {name: "Multiple settlements", weight: 3},
    {name: "Settlements in conflict", weight: 2}
]);

// Planet-Ice-World-Settlements-Expanse
createTable("Planet-Ice-World-Settlements-Expanse", [
    {name: "None", weight: 90},
    {name: "Orbital settlement", weight: 6},
    {name: "Planetside settlement", weight: 4}
]);

// Planet-Ice-World-From-Space
createTable("Planet-Ice-World-From-Space", [
    {name: "Feeble sunlight", weight: 11},
    {name: "Frozen oceans", weight: 11},
    {name: "Rocky glacial islands", weight: 11},
    {name: "Snowbound mountains", weight: 11},
    {name: "Sky-breaching geysers", weight: 11},
    {name: "Supersized ice volcano", weight: 11},
    {name: "Vibrantly colored ice", weight: 11},
    {name: "World-spanning ice canyon", weight: 11},
    {name: "Descriptor + Focus", weight: 10},
    {name: "Precursor Vault (orbital)", weight: 2}
]);

// Planet-Ice-World-Planetside-Feature
createTable("Planet-Ice-World-Planetside-Feature", [
    {name: "Abyssal ice fissures", weight: 7},
    {name: "Blinding snow storms", weight: 7},
    {name: "Clusters of ice spikes", weight: 7},
    {name: "Colossal ice caves", weight: 7},
    {name: "Glistening ice spires", weight: 7},
    {name: "Massive snow drifts", weight: 7},
    {name: "Preserved carcasses", weight: 7},
    {name: "Rocky islands amid icy wastes", weight: 7},
    {name: "Shattered plains of pack ice", weight: 7},
    {name: "Steaming hot springs", weight: 7},
    {name: "Subsurface liquid oceans", weight: 7},
    {name: "Vibrant auroras", weight: 7},
    {name: "Wind-carved ice formations", weight: 7},
    {name: "Descriptor + Focus", weight: 7},
    {name: "Precursor Vault (planetside)", weight: 2}
]);

// Planet-Ice-World-Life
createTable("Planet-Ice-World-Life", [
    {name: "None", weight: 25},
    {name: "Extinct", weight: 20},
    {name: "Simple", weight: 15},
    {name: "Sparse", weight: 15},
    {name: "Diverse", weight: 15},
    {name: "Bountiful", weight: 7},
    {name: "Overrun", weight: 3}
]);

// Planet-Jovian-World-Settlements-Terminus
createTable("Planet-Jovian-World-Settlements-Terminus", [
    {name: "None", weight: 50},
    {name: "Orbital settlement", weight: 20},
    {name: "Planetside settlement", weight: 15},
    {name: "Multiple settlements", weight: 10},
    {name: "Settlements in conflict", weight: 5}
]);

// Planet-Jovian-World-Settlements-Outlands
createTable("Planet-Jovian-World-Settlements-Outlands", [
    {name: "None", weight: 75},
    {name: "Orbital settlement", weight: 12},
    {name: "Planetside settlement", weight: 8},
    {name: "Multiple settlements", weight: 3},
    {name: "Settlements in conflict", weight: 2}
]);

// Planet-Jovian-World-Settlements-Expanse
createTable("Planet-Jovian-World-Settlements-Expanse", [
    {name: "None", weight: 90},
    {name: "Orbital settlement", weight: 6},
    {name: "Planetside settlement", weight: 4}
]);

// Planet-Jovian-World-From-Space
createTable("Planet-Jovian-World-From-Space", [
    {name: "Complex ring system", weight: 11},
    {name: "Intense gravity well", weight: 11},
    {name: "Numerous moons", weight: 11},
    {name: "Perpetual superstorm", weight: 11},
    {name: "Powerful magnetic field", weight: 11},
    {name: "Severe electrical storms", weight: 11},
    {name: "Superheated atmosphere", weight: 11},
    {name: "Unusual atmospheric colors", weight: 11},
    {name: "Descriptor + Focus", weight: 10},
    {name: "Precursor Vault (orbital)", weight: 2}
]);

// Planet-Jovian-World-Planetside-Feature
createTable("Planet-Jovian-World-Planetside-Feature", [
    {name: "Clouds of metal particles", weight: 7},
    {name: "Crystalline rains", weight: 7},
    {name: "Floating glaciers", weight: 7},
    {name: "Floating islands", weight: 7},
    {name: "Layer of suspended liquid", weight: 7},
    {name: "Pockets of explosive gases", weight: 7},
    {name: "Powerful vortexes", weight: 7},
    {name: "Radiation fields", weight: 7},
    {name: "Storm-swept rocky debris", weight: 7},
    {name: "Torrential rain", weight: 7},
    {name: "Towering thunderheads", weight: 7},
    {name: "Violent turbulence", weight: 7},
    {name: "Zones of localized atmosphere", weight: 7},
    {name: "Descriptor + Focus", weight: 7},
    {name: "Precursor Vault (planetside)", weight: 2}
]);

// Planet-Jovian-World-Life
createTable("Planet-Jovian-World-Life", [
    {name: "None", weight: 50},
    {name: "Extinct", weight: 5},
    {name: "Simple", weight: 15},
    {name: "Sparse", weight: 10},
    {name: "Diverse", weight: 10},
    {name: "Bountiful", weight: 5},
    {name: "Overrun", weight: 5}
]);

// Planet-Jungle-World-Settlements-Terminus
createTable("Planet-Jungle-World-Settlements-Terminus", [
    {name: "None", weight: 40},
    {name: "Orbital settlement", weight: 15},
    {name: "Planetside settlement", weight: 25},
    {name: "Multiple settlements", weight: 12},
    {name: "Settlements in conflict", weight: 8}
]);

// Planet-Jungle-World-Settlements-Outlands
createTable("Planet-Jungle-World-Settlements-Outlands", [
    {name: "None", weight: 65},
    {name: "Orbital settlement", weight: 10},
    {name: "Planetside settlement", weight: 18},
    {name: "Multiple settlements", weight: 5},
    {name: "Settlements in conflict", weight: 2}
]);

// Planet-Jungle-World-Settlements-Expanse
createTable("Planet-Jungle-World-Settlements-Expanse", [
    {name: "None", weight: 85},
    {name: "Orbital settlement", weight: 5},
    {name: "Planetside settlement", weight: 7},
    {name: "Multiple settlements", weight: 2},
    {name: "Settlements in conflict", weight: 1}
]);

// Planet-Jungle-World-From-Space
createTable("Planet-Jungle-World-From-Space", [
    {name: "Cloud-breaching trees", weight: 11},
    {name: "Expansive rivers or wetlands", weight: 11},
    {name: "Inland seas", weight: 11},
    {name: "Massive canyons", weight: 11},
    {name: "Persistent cloud cover", weight: 11},
    {name: "Towering mountains", weight: 11},
    {name: "Unbroken canopy", weight: 11},
    {name: "Unusual vegetation color", weight: 11},
    {name: "Descriptor + Focus", weight: 10},
    {name: "Precursor Vault (orbital)", weight: 2}
]);

// Planet-Jungle-World-Planetside-Feature
createTable("Planet-Jungle-World-Planetside-Feature", [
    {name: "Bioluminescent flora", weight: 7},
    {name: "Deep river gorges", weight: 7},
    {name: "Extensive exposed root systems", weight: 7},
    {name: "Immense tiered waterfalls", weight: 7},
    {name: "Languid rivers", weight: 7},
    {name: "Low-lying fog", weight: 7},
    {name: "Plunging sinkholes", weight: 7},
    {name: "Scarred clearings", weight: 7},
    {name: "Sinking quagmires", weight: 7},
    {name: "Surging rivers", weight: 7},
    {name: "Torrential rainstorms", weight: 7},
    {name: "Violent electrical storms", weight: 7},
    {name: "Waterlogged caves", weight: 7},
    {name: "Descriptor + Focus", weight: 7},
    {name: "Precursor Vault (planetside)", weight: 2}
]);

// Planet-Jungle-World-Life
createTable("Planet-Jungle-World-Life", [
    {name: "Simple", weight: 5},
    {name: "Sparse", weight: 15},
    {name: "Diverse", weight: 25},
    {name: "Bountiful", weight: 35},
    {name: "Overrun", weight: 20}
]);

// Planet-Ocean-World-Settlements-Terminus
createTable("Planet-Ocean-World-Settlements-Terminus", [
    {name: "None", weight: 40},
    {name: "Orbital settlement", weight: 15},
    {name: "Planetside settlement", weight: 25},
    {name: "Multiple settlements", weight: 12},
    {name: "Settlements in conflict", weight: 8}
]);

// Planet-Ocean-World-Settlements-Outlands
createTable("Planet-Ocean-World-Settlements-Outlands", [
    {name: "None", weight: 65},
    {name: "Orbital settlement", weight: 10},
    {name: "Planetside settlement", weight: 17},
    {name: "Multiple settlements", weight: 5},
    {name: "Settlements in conflict", weight: 3}
]);

// Planet-Ocean-World-Settlements-Expanse
createTable("Planet-Ocean-World-Settlements-Expanse", [
    {name: "None", weight: 85},
    {name: "Orbital settlement", weight: 5},
    {name: "Planetside settlement", weight: 7},
    {name: "Multiple settlements", weight: 2},
    {name: "Settlements in conflict", weight: 1}
]);

// Planet-Ocean-World-From-Space
createTable("Planet-Ocean-World-From-Space", [
    {name: "Complex reef systems", weight: 11},
    {name: "Emerging volcanoes", weight: 11},
    {name: "Floating forests", weight: 11},
    {name: "Global hurricanes", weight: 11},
    {name: "Large moon and strong tides", weight: 11},
    {name: "Scattered islands", weight: 11},
    {name: "Semi-frozen oceans", weight: 11},
    {name: "Unusual water color", weight: 11},
    {name: "Descriptor + Focus", weight: 10},
    {name: "Precursor Vault (orbital)", weight: 2}
]);

// Planet-Ocean-World-Planetside-Feature
createTable("Planet-Ocean-World-Planetside-Feature", [
    {name: "Abyssal trenches", weight: 7},
    {name: "Living islands", weight: 7},
    {name: "Luminescent seas", weight: 7},
    {name: "Roaming icebergs", weight: 7},
    {name: "Shallow-water plains", weight: 7},
    {name: "Subsurface volcanoes", weight: 7},
    {name: "Titanic waves", weight: 7},
    {name: "Undersea air pockets", weight: 7},
    {name: "Undersea caves", weight: 7},
    {name: "Undersea forests", weight: 7},
    {name: "Unrelenting rainfall", weight: 7},
    {name: "Violent currents", weight: 7},
    {name: "Windborne waterspouts", weight: 7},
    {name: "Descriptor + Focus", weight: 7},
    {name: "Precursor Vault (planetside)", weight: 2}
]);

// Planet-Ocean-World-Life
createTable("Planet-Ocean-World-Life", [
    {name: "None", weight: 5},
    {name: "Extinct", weight: 10},
    {name: "Simple", weight: 10},
    {name: "Sparse", weight: 20},
    {name: "Diverse", weight: 25},
    {name: "Bountiful", weight: 20},
    {name: "Overrun", weight: 10}
]);

// Planet-Rocky-World-Settlements-Terminus
createTable("Planet-Rocky-World-Settlements-Terminus", [
    {name: "None", weight: 50},
    {name: "Orbital settlement", weight: 20},
    {name: "Planetside settlement", weight: 15},
    {name: "Multiple settlements", weight: 10},
    {name: "Settlements in conflict", weight: 5}
]);

// Planet-Rocky-World-Settlements-Outlands
createTable("Planet-Rocky-World-Settlements-Outlands", [
    {name: "None", weight: 75},
    {name: "Orbital settlement", weight: 12},
    {name: "Planetside settlement", weight: 8},
    {name: "Multiple settlements", weight: 3},
    {name: "Settlements in conflict", weight: 2}
]);

// Planet-Rocky-World-Settlements-Expanse
createTable("Planet-Rocky-World-Settlements-Expanse", [
    {name: "None", weight: 90},
    {name: "Orbital settlement", weight: 6},
    {name: "Planetside settlement", weight: 4}
]);

// Planet-Rocky-World-From-Space
createTable("Planet-Rocky-World-From-Space", [
    {name: "Barren plains", weight: 11},
    {name: "Constant asteroid strikes", weight: 11},
    {name: "Dense ring system", weight: 11},
    {name: "Jagged mountains", weight: 11},
    {name: "Massive impact crater", weight: 11},
    {name: "Misshapen form (low gravity)", weight: 11},
    {name: "Perpetual night", weight: 11},
    {name: "Towering plateaus", weight: 11},
    {name: "Descriptor + Focus", weight: 10},
    {name: "Precursor Vault (orbital)", weight: 2}
]);

// Planet-Rocky-World-Planetside-Feature
createTable("Planet-Rocky-World-Planetside-Feature", [
    {name: "Crystalline formations", weight: 7},
    {name: "Crystalline caves", weight: 7},
    {name: "Exposed mineral deposits", weight: 7},
    {name: "Geometric terrain features", weight: 7},
    {name: "Geothermal vents", weight: 7},
    {name: "Glassy impact craters", weight: 7},
    {name: "Massive dust dunes", weight: 7},
    {name: "Powerful magnetic fields", weight: 7},
    {name: "Rubble-strewn lava fields", weight: 7},
    {name: "Steam-heated caves", weight: 7},
    {name: "Subsurface magma flows", weight: 7},
    {name: "Swirling low-lying gases", weight: 7},
    {name: "Towering rocky spires", weight: 7},
    {name: "Descriptor + Focus", weight: 7},
    {name: "Precursor Vault (planetside)", weight: 2}
]);

// Planet-Rocky-World-Life
createTable("Planet-Rocky-World-Life", [
    {name: "None", weight: 55},
    {name: "Extinct", weight: 10},
    {name: "Simple", weight: 15},
    {name: "Sparse", weight: 10},
    {name: "Diverse", weight: 5},
    {name: "Bountiful", weight: 3},
    {name: "Overrun", weight: 2}
]);

// Planet-Shattered-World-Settlements-Terminus
createTable("Planet-Shattered-World-Settlements-Terminus", [
    {name: "None", weight: 70},
    {name: "Orbital settlement", weight: 20},
    {name: "Planetside settlement", weight: 5},
    {name: "Multiple settlements", weight: 3},
    {name: "Settlements in conflict", weight: 2}
]);

// Planet-Shattered-World-Settlements-Outlands
createTable("Planet-Shattered-World-Settlements-Outlands", [
    {name: "None", weight: 85},
    {name: "Orbital settlement", weight: 10},
    {name: "Planetside settlement", weight: 4},
    {name: "Multiple settlements", weight: 1}
]);

// Planet-Shattered-World-Settlements-Expanse
createTable("Planet-Shattered-World-Settlements-Expanse", [
    {name: "None", weight: 95},
    {name: "Orbital settlement", weight: 4},
    {name: "Planetside settlement", weight: 1}
]);

// Planet-Shattered-World-From-Space
createTable("Planet-Shattered-World-From-Space", [
    {name: "Demolished space fleet", weight: 11},
    {name: "Dense ring system", weight: 11},
    {name: "Fiery planetary core", weight: 11},
    {name: "Geomagnetic storms", weight: 11},
    {name: "Intense solar radiation", weight: 11},
    {name: "Preserved planetary fragment", weight: 11},
    {name: "Swirling debris field", weight: 11},
    {name: "Unbroken moon", weight: 11},
    {name: "Descriptor + Focus", weight: 10},
    {name: "Precursor Vault (orbital)", weight: 2}
]);

// Planet-Shattered-World-Planetside-Feature
createTable("Planet-Shattered-World-Planetside-Feature", [
    {name: "Broken cities", weight: 7},
    {name: "Colliding fragments", weight: 7},
    {name: "Energy storms", weight: 7},
    {name: "Exposed caverns", weight: 7},
    {name: "Fluctuating gravity", weight: 7},
    {name: "Magnetic disturbances", weight: 7},
    {name: "Molten fissures", weight: 7},
    {name: "Phantom visions of the past", weight: 7},
    {name: "Pocket atmosphere", weight: 7},
    {name: "Residual energy storms", weight: 7},
    {name: "Swirling corrosive gases", weight: 7},
    {name: "Unstable and fracturing terrain", weight: 7},
    {name: "Venting magma", weight: 7},
    {name: "▸Descriptor + Focus", weight: 7},
    {name: "▸Precursor Vault (planetside)", weight: 2}
]);

// Planet-Shattered-World-Life
createTable("Planet-Shattered-World-Life", [
    {name: "None", weight: 30},
    {name: "Extinct", weight: 50},
    {name: "Simple", weight: 10},
    {name: "Sparse", weight: 6},
    {name: "Diverse", weight: 4}
]);

// Planet-Tainted-World-Settlements-Terminus
createTable("Planet-Tainted-World-Settlements-Terminus", [
    {name: "None", weight: 80},
    {name: "Orbital settlement", weight: 10},
    {name: "Planetside settlement", weight: 5},
    {name: "Multiple settlements", weight: 3},
    {name: "Settlements in conflict", weight: 2}
]);

// Planet-Tainted-World-Settlements-Outlands
createTable("Planet-Tainted-World-Settlements-Outlands", [
    {name: "None", weight: 90},
    {name: "Orbital settlement", weight: 7},
    {name: "Planetside settlement", weight: 3}
]);

// Planet-Tainted-World-Settlements-Expanse
createTable("Planet-Tainted-World-Settlements-Expanse", [
    {name: "None", weight: 95},
    {name: "Orbital settlement", weight: 3},
    {name: "Planetside settlement", weight: 2}
]);

// Planet-Tainted-World-Planetside-Feature
createTable("Planet-Tainted-World-Planetside-Feature", [
    {name: "Caustic gas storms", weight: 7},
    {name: "Corrosive, low-lying fog", weight: 7},
    {name: "Fungus-encrusted caves", weight: 7},
    {name: "Gelatinous ponds", weight: 7},
    {name: "Hallucinogenic toxins", weight: 7},
    {name: "Layers of fast-growing lichen", weight: 7},
    {name: "Moldering bones", weight: 7},
    {name: "Mutated flora", weight: 7},
    {name: "Poisonous gas vents", weight: 7},
    {name: "Spore clouds", weight: 7},
    {name: "Terrain marred by fleshy pustules", weight: 7},
    {name: "Toxic rain", weight: 7},
    {name: "Virulent fungal infestations", weight: 7},
    {name: "Descriptor + Focus", weight: 7},
    {name: "Precursor Vault (planetside)", weight: 2}
]);

// Planet-Tainted-World-From-Space
createTable("Planet-Tainted-World-From-Space", [
    {name: "Expansive fungal plains", weight: 11},
    {name: "Fungal forests", weight: 11},
    {name: "Scabrous, infected terrain", weight: 11},
    {name: "Sky-breaching fungus", weight: 11},
    {name: "Sludge-filled river networks", weight: 11},
    {name: "Stagnant cloud cover", weight: 11},
    {name: "Thick, murky atmosphere", weight: 11},
    {name: "Toxic seas", weight: 11},
    {name: "Descriptor + Focus", weight: 10},
    {name: "Precursor Vault (orbital)", weight: 2}
]);

// Planet-Tainted-World-Life
createTable("Planet-Tainted-World-Life", [
    {name: "Simple", weight: 5},
    {name: "Sparse", weight: 10},
    {name: "Diverse", weight: 15},
    {name: "Bountiful", weight: 25},
    {name: "Overrun", weight: 45}
]);

// Planet-Vital-World-Settlements-Terminus
createTable("Planet-Vital-World-Settlements-Terminus", [
    {name: "None", weight: 20},
    {name: "Orbital settlement", weight: 10},
    {name: "Planetside settlement", weight: 40},
    {name: "Multiple settlements", weight: 20},
    {name: "Settlements in conflict", weight: 10}
]);

// Planet-Vital-World-Settlements-Outlands
createTable("Planet-Vital-World-Settlements-Outlands", [
    {name: "None", weight: 50},
    {name: "Orbital settlement", weight: 5},
    {name: "Planetside settlement", weight: 30},
    {name: "Multiple settlements", weight: 10},
    {name: "Settlements in conflict", weight: 5}
]);

// Planet-Vital-World-Settlements-Expanse
createTable("Planet-Vital-World-Settlements-Expanse", [
    {name: "None", weight: 80},
    {name: "Orbital settlement", weight: 3},
    {name: "Planetside settlement", weight: 10},
    {name: "Multiple settlements", weight: 5},
    {name: "Settlements in conflict", weight: 2}
]);

// Planet-Vital-World-From-Space
createTable("Planet-Vital-World-From-Space", [
    {name: "Complex ring system", weight: 11},
    {name: "Dramatic seasonal variation", weight: 11},
    {name: "High gravity", weight: 11},
    {name: "Large moon", weight: 11},
    {name: "Narrow livable band", weight: 11},
    {name: "Numerous small moons", weight: 11},
    {name: "Unusual day or night cycle", weight: 11},
    {name: "Vibrantly colored landscapes", weight: 11},
    {name: "Descriptor + Focus", weight: 10},
    {name: "Precursor Vault (orbital)", weight: 2}
]);

// Planet-Vital-World-Planetside-Feature
createTable("Planet-Vital-World-Planetside-Feature", [
    {name: "Background radiation", weight: 7},
    {name: "Chaotically juxtaposed biomes", weight: 7},
    {name: "Creature boneyards", weight: 7},
    {name: "Creature lairs or watering holes", weight: 7},
    {name: "Crystalline formations", weight: 7},
    {name: "Fierce electrical storms", weight: 7},
    {name: "Floating terrain", weight: 7},
    {name: "Frequent seismic activity", weight: 7},
    {name: "Magnetic disturbances", weight: 7},
    {name: "Scarred or excavated terrain", weight: 7},
    {name: "Signs of an engineered biosphere", weight: 7},
    {name: "Sudden weather fluctuations", weight: 7},
    {name: "Towering geological formations", weight: 7},
    {name: "Descriptor + Focus", weight: 7},
    {name: "Precursor Vault (planetside)", weight: 2}
]);

// Planet-Vital-World-Life
createTable("Planet-Vital-World-Life", [
    {name: "Sparse", weight: 10},
    {name: "Diverse", weight: 35},
    {name: "Bountiful", weight: 40},
    {name: "Overrun", weight: 15}
]);

// Planet-Vital-World-Diversity
createTable("Planet-Vital-World-Diversity", [
    {name: "Simple (two biomes)", weight: 20},
    {name: "Diverse (three biomes)", weight: 50},
    {name: "Complex (four biomes)", weight: 20},
    {name: "Garden world (five or more biomes)", weight: 10}
]);

// Planet-Vital-World-Biomes
createTable("Planet-Vital-World-Biomes", [
    {name: "Caves", weight: 5},
    {name: "Cold forest", weight: 5},
    {name: "Fungal", weight: 5},
    {name: "Glacial or snow", weight: 5},
    {name: "Grassland", weight: 5},
    {name: "Islands", weight: 5},
    {name: "Jungle", weight: 5},
    {name: "Mountainous", weight: 5},
    {name: "Ocean", weight: 5},
    {name: "Rocky desert", weight: 5},
    {name: "Sandy desert", weight: 5},
    {name: "Savanna", weight: 5},
    {name: "Shallow seas", weight: 5},
    {name: "Shrubland", weight: 5},
    {name: "Temperate rainforest", weight: 5},
    {name: "Temperate forest", weight: 5},
    {name: "Tundra", weight: 5},
    {name: "Volcanic", weight: 5},
    {name: "Waterways", weight: 5},
    {name: "Wetland", weight: 5}
]);

// Planet-Class
createTable("Planet-Class", [
    {name: "Desert World (A pitiless planet of searing heat, blowing sand, and sunbaked rock.)", weight: 15},
    {name: "Furnace World (A planet with relentless volcanic activity, wreathed in fire and ash.)", weight: 15},
    {name: "Grave World (A once-thriving world—now a grim monument to a fallen civilization.)", weight: 5},
    {name: "Ice World (A rugged, frozen world—locked in an unending winter.)", weight: 15},
    {name: "Jovian World (A massive planet with vast layers of dense gases surrounding a small rocky core.)", weight: 15},
    {name: "Jungle World (A humid, rain-soaked planet which keeps its secrets under a thick canopy of vegetation.)", weight: 5},
    {name: "Ocean World (A planet completely or mostly covered by a boundless ocean.)", weight: 5},
    {name: "Rocky World (A rugged planet scarred by eons of destructive asteroid impacts.)", weight: 15},
    {name: "Shattered World (A planet sundered by cataclysmic destruction.)", weight: 2},
    {name: "Tainted World (A foul planet wracked by a poisonous climate and virulent growths.)", weight: 6},
    {name: "Vital World (This diverse, life-bearing planet might provide some small measure of hope.)", weight: 2}
]);

// Settlement-Location
createTable("Settlement-Location", [
    {name: "Planetside", weight: 40},
    {name: "Orbital", weight: 35},
    {name: "Deep Space", weight: 25}
]);

// Settlement-Population-Terminus
createTable("Settlement-Population-Terminus", [
    {name: "Few", weight: 10},
    {name: "Dozens", weight: 15},
    {name: "Hundreds", weight: 30},
    {name: "Thousands", weight: 30},
    {name: "Tens of thousands", weight: 15}
]);

// Settlement-Population-Outlands
createTable("Settlement-Population-Outlands", [
    {name: "Few", weight: 15},
    {name: "Dozens", weight: 20},
    {name: "Hundreds", weight: 30},
    {name: "Thousands", weight: 25},
    {name: "Tens of thousands", weight: 10}
]);

// Settlement-Population-Expanse
createTable("Settlement-Population-Expanse", [
    {name: "Few", weight: 20},
    {name: "Dozens", weight: 30},
    {name: "Hundreds", weight: 30},
    {name: "Thousands", weight: 15},
    {name: "Tens of thousands", weight: 5}
]);

// Settlement-First-Look
createTable("Settlement-First-Look", [
    {name: "Beautiful architecture", weight: 3},
    {name: "Built from organic materials", weight: 6},
    {name: "Built from random scrap", weight: 6},
    {name: "Built within repurposed ship", weight: 6},
    {name: "Built within terrain or asteroid", weight: 5},
    {name: "Defensible location", weight: 5},
    {name: "Elevated or multi-level construction", weight: 4},
    {name: "Hidden or subsurface location", weight: 5},
    {name: "High-tech construction", weight: 3},
    {name: "Industrial architecture", weight: 6},
    {name: "Intimidating defenses", weight: 4},
    {name: "Moving or transforming", weight: 3},
    {name: "Obvious social stratification", weight: 5},
    {name: "Precarious location", weight: 5},
    {name: "Rustic architecture", weight: 6},
    {name: "Significant structural damage", weight: 4},
    {name: "Sprawling or dispersed structures", weight: 4},
    {name: "Temporary or seasonal location", weight: 3},
    {name: "Toxic or polluted habitat", weight: 4},
    {name: "Precursor Vault", weight: 3},
    {name: "Descriptor + Focus", weight: 10}
]);

// Settlement-Initial-Contact
createTable("Settlement-Initial-Contact", [
    {name: "Welcoming", weight: 20},
    {name: "Neutral / automated", weight: 10},
    {name: "Wary", weight: 20},
    {name: "Uncooperative", weight: 10},
    {name: "Hostile", weight: 10},
    {name: "Asking for help", weight: 13},
    {name: "In battle", weight: 3},
    {name: "Captured", weight: 3},
    {name: "Unresponsive", weight: 3},
    {name: "Destroyed", weight: 3},
    {name: "Derelict", weight: 5}
]);

// Settlement-Authority
createTable("Settlement-Authority", [
    {name: "None / lawless", weight: 15},
    {name: "Ineffectual", weight: 15},
    {name: "Tolerant", weight: 15},
    {name: "Fair", weight: 10},
    {name: "Unyielding", weight: 15},
    {name: "Corrupt", weight: 15},
    {name: "Oppressive", weight: 15}
]);

// Settlement-Projects
createTable("Settlement-Projects", [
    {name: "Agriculture", weight: 5},
    {name: "Archeology", weight: 2},
    {name: "Automation", weight: 2},
    {name: "Black market", weight: 2},
    {name: "Command", weight: 2},
    {name: "Defense", weight: 4},
    {name: "Energy", weight: 5},
    {name: "Engineering", weight: 3},
    {name: "Entertainment", weight: 2},
    {name: "Environmentalism", weight: 2},
    {name: "Evacuation", weight: 2},
    {name: "Expansion", weight: 2},
    {name: "Exploration", weight: 4},
    {name: "Festival", weight: 2},
    {name: "History", weight: 2},
    {name: "Hunting", weight: 2},
    {name: "Manufacturing", weight: 3},
    {name: "Medical", weight: 3},
    {name: "Migration", weight: 2},
    {name: "Mining", weight: 6},
    {name: "Pacifism", weight: 2},
    {name: "Raiding", weight: 3},
    {name: "Research", weight: 3},
    {name: "Salvage", weight: 4},
    {name: "Secrecy", weight: 3},
    {name: "Shipbuilding", weight: 3},
    {name: "Spirituality", weight: 3},
    {name: "Subsistence", weight: 6},
    {name: "Surveillance", weight: 2},
    {name: "Terraforming", weight: 2},
    {name: "Trade", weight: 4},
    {name: "Warfare", weight: 3},
    {name: "Action + Theme", weight: 5}
]);

// Settlement-Trouble
createTable("Settlement-Trouble", [
    {name: "Betrayal from within", weight: 5},
    {name: "Blocked resource", weight: 2},
    {name: "Caught in the crossfire", weight: 2},
    {name: "Changing environment", weight: 2},
    {name: "Clash of cultures", weight: 2},
    {name: "Dangerous discovery", weight: 4},
    {name: "Depleted resource", weight: 5},
    {name: "Failing technology", weight: 3},
    {name: "Feuding factions", weight: 2},
    {name: "Ghostly visitations", weight: 2},
    {name: "Hazardous environment", weight: 2},
    {name: "Hostile lifeforms", weight: 2},
    {name: "Impending attack", weight: 4},
    {name: "Impending natural disaster", weight: 2},
    {name: "Invasive nature or lifeform", weight: 2},
    {name: "Mysterious deaths", weight: 2},
    {name: "Plagued by sickness", weight: 3},
    {name: "Preyed upon by raiders", weight: 3},
    {name: "Revolt against leadership", weight: 2},
    {name: "Sabotaged technology", weight: 6},
    {name: "Social strife", weight: 2},
    {name: "Someone is ill or injured", weight: 3},
    {name: "Someone is missing", weight: 3},
    {name: "Stolen technology or object", weight: 4},
    {name: "Strange phenomenon", weight: 3},
    {name: "Toxic waste or pollution", weight: 3},
    {name: "Volatile energy source", weight: 3},
    {name: "Vulnerable lifeforms", weight: 6},
    {name: "Action + Theme", weight: 2},
    {name: "Roll twice", weight: 10}
]);

// Settlement-Name
createTable("Settlement-Name", [
    {name: "Aegis", weight: 1},
    {name: "Altair", weight: 1},
    {name: "Altura", weight: 1},
    {name: "Amity", weight: 1},
    {name: "Apex", weight: 1},
    {name: "Apogee", weight: 1},
    {name: "Argosy", weight: 1},
    {name: "Astra", weight: 1},
    {name: "Aurora", weight: 1},
    {name: "Beowulf", weight: 1},
    {name: "Brink", weight: 1},
    {name: "Bulwark", weight: 1},
    {name: "Burnell", weight: 1},
    {name: "Burrow", weight: 1},
    {name: "Concord", weight: 1},
    {name: "Crux", weight: 1},
    {name: "Deadrock", weight: 1},
    {name: "Deception", weight: 1},
    {name: "Elysium", weight: 1},
    {name: "Enigma", weight: 1},
    {name: "Erebus", weight: 1},
    {name: "Eris", weight: 1},
    {name: "Evenfall", weight: 1},
    {name: "Eventide", weight: 1},
    {name: "Farpoint", weight: 1},
    {name: "Felicity", weight: 1},
    {name: "Florin", weight: 1},
    {name: "Forlorn", weight: 1},
    {name: "Forsaken", weight: 1},
    {name: "Freya", weight: 1},
    {name: "Glimmer", weight: 1},
    {name: "Gloam", weight: 1},
    {name: "Hearth", weight: 1},
    {name: "Helia", weight: 1},
    {name: "Hypatia", weight: 1},
    {name: "Hyperion", weight: 1},
    {name: "Janus", weight: 1},
    {name: "Karma", weight: 1},
    {name: "Kepler", weight: 1},
    {name: "Koshiba", weight: 1},
    {name: "Lagrange", weight: 1},
    {name: "Larissa", weight: 1},
    {name: "Lasthope", weight: 1},
    {name: "Lastport", weight: 1},
    {name: "Legacy", weight: 1},
    {name: "Lodestar", weight: 1},
    {name: "Luminus", weight: 1},
    {name: "Lyra", weight: 1},
    {name: "Marrow", weight: 1},
    {name: "Meridian", weight: 1},
    {name: "Moirai", weight: 1},
    {name: "Mudd", weight: 1},
    {name: "Neoma", weight: 1},
    {name: "Nerio", weight: 1},
    {name: "Nova", weight: 1},
    {name: "Nyx", weight: 1},
    {name: "Osseus", weight: 1},
    {name: "Paradox", weight: 1},
    {name: "Paragon", weight: 1},
    {name: "Paxton", weight: 1},
    {name: "Perchance", weight: 1},
    {name: "Pinnacle", weight: 1},
    {name: "Polaris", weight: 1},
    {name: "Portent", weight: 1},
    {name: "Prism", weight: 1},
    {name: "Providence", weight: 1},
    {name: "Purgatory", weight: 1},
    {name: "Rampart", weight: 1},
    {name: "Ramshackle", weight: 1},
    {name: "Redemption", weight: 1},
    {name: "Redhaven", weight: 1},
    {name: "Relic", weight: 1},
    {name: "Reprise", weight: 1},
    {name: "Reverie", weight: 1},
    {name: "Rhiannon", weight: 1},
    {name: "Rockhome", weight: 1},
    {name: "Rust", weight: 1},
    {name: "Sagan", weight: 1},
    {name: "Sanctity", weight: 1},
    {name: "Selena", weight: 1},
    {name: "Sepulcher", weight: 1},
    {name: "Sigil", weight: 1},
    {name: "Silvana", weight: 1},
    {name: "Sirius", weight: 1},
    {name: "Sisyphus", weight: 1},
    {name: "Solitude", weight: 1},
    {name: "Spire", weight: 1},
    {name: "Starfall", weight: 1},
    {name: "Summit", weight: 1},
    {name: "Tranquility", weight: 1},
    {name: "Tyson", weight: 1},
    {name: "Unity", weight: 1},
    {name: "Utopia", weight: 1},
    {name: "Vega", weight: 1},
    {name: "Vesper", weight: 1},
    {name: "Wayward", weight: 1},
    {name: "Welkin", weight: 1},
    {name: "Wellspring", weight: 1},
    {name: "Weyland", weight: 1},
    {name: "Wreck", weight: 1}
]);

// Starship-Name
createTable("Starship-Name", [
    {name: "Arclight", weight: 1},
    {name: "Argent Arrow", weight: 1},
    {name: "Artemis", weight: 1},
    {name: "Astral Explorer", weight: 1},
    {name: "Atlas", weight: 1},
    {name: "Aurora", weight: 1},
    {name: "Avari's Wake", weight: 1},
    {name: "Banshee's Cry", weight: 1},
    {name: "Beowulf", weight: 1},
    {name: "Bloody Jaw", weight: 1},
    {name: "Broken Sword", weight: 1},
    {name: "Buccaneer", weight: 1},
    {name: "Cerelis Nine", weight: 1},
    {name: "Clarion Call", weight: 1},
    {name: "Dawn's Herald", weight: 1},
    {name: "Dead Reckoning", weight: 1},
    {name: "Drift Runner", weight: 1},
    {name: "Eclipse", weight: 1},
    {name: "Elara Five", weight: 1},
    {name: "Enchantress", weight: 1},
    {name: "Endurance", weight: 1},
    {name: "Excalibur", weight: 1},
    {name: "Eye of the Void", weight: 1},
    {name: "Fall of Icarus", weight: 1},
    {name: "Fallen Light", weight: 1},
    {name: "False Hope", weight: 1},
    {name: "Firebreak", weight: 1},
    {name: "First Light", weight: 1},
    {name: "Forge Flier", weight: 1},
    {name: "Fortune's Favor", weight: 1},
    {name: "Freya’s Wrath", weight: 1},
    {name: "Ghost", weight: 1},
    {name: "Guiding Star", weight: 1},
    {name: "Hand of Fate", weight: 1},
    {name: "Herald of Doom", weight: 1},
    {name: "Implacable", weight: 1},
    {name: "Implicit", weight: 1},
    {name: "Inferno", weight: 1},
    {name: "Invictus", weight: 1},
    {name: "Iron Cairn", weight: 1},
    {name: "Karena's Reverie", weight: 1},
    {name: "Kraken", weight: 1},
    {name: "Kuno's Hammer", weight: 1},
    {name: "Lightline", weight: 1},
    {name: "Lodestar", weight: 1},
    {name: "Long Haul", weight: 1},
    {name: "Lost Fortune", weight: 1},
    {name: "Luminous Sorrow", weight: 1},
    {name: "Manta", weight: 1},
    {name: "Mercy", weight: 1},
    {name: "Mutara", weight: 1},
    {name: "Nebula Prowler", weight: 1},
    {name: "Newton's Folly", weight: 1},
    {name: "Nightfall", weight: 1},
    {name: "Nomad", weight: 1},
    {name: "Obsidian Trident", weight: 1},
    {name: "Onslaught", weight: 1},
    {name: "Orca", weight: 1},
    {name: "Outward Bound", weight: 1},
    {name: "Phantom", weight: 1},
    {name: "Photon", weight: 1},
    {name: "Poltergeist", weight: 1},
    {name: "Profit Margin", weight: 1},
    {name: "Raven's Call", weight: 1},
    {name: "Raya's Promise", weight: 1},
    {name: "Reaper", weight: 1},
    {name: "Reforged Hope", weight: 1},
    {name: "Relentless", weight: 1},
    {name: "Royal Signet", weight: 1},
    {name: "Rubicon", weight: 1},
    {name: "Sareea's Tribute", weight: 1},
    {name: "Second Chance", weight: 1},
    {name: "Shard of the Sun", weight: 1},
    {name: "Shattered Siege", weight: 1},
    {name: "Shattered Star", weight: 1},
    {name: "Silver Talon", weight: 1},
    {name: "Smoldering Flame", weight: 1},
    {name: "Sovereign Skies", weight: 1},
    {name: "Sparrowhawk", weight: 1},
    {name: "Stardust", weight: 1},
    {name: "Starfall", weight: 1},
    {name: "Stellar Hawk", weight: 1},
    {name: "Stormswept", weight: 1},
    {name: "Sundered Aegis", weight: 1},
    {name: "Sundown", weight: 1},
    {name: "Sureshot", weight: 1},
    {name: "Terminus Clipper", weight: 1},
    {name: "Terrapin", weight: 1},
    {name: "Timber Wolf", weight: 1},
    {name: "Tip of the Spear", weight: 1},
    {name: "Titan", weight: 1},
    {name: "Tormentor", weight: 1},
    {name: "Trithia Six", weight: 1},
    {name: "Ultraviolet", weight: 1},
    {name: "Valora's Comet", weight: 1},
    {name: "Vengeance", weight: 1},
    {name: "Venture", weight: 1},
    {name: "Vigilant", weight: 1},
    {name: "Voidtreader", weight: 1},
    {name: "Vulture", weight: 1}
]);

// Starship-Type
createTable("Starship-Type", [
    {name: "Carrier (Launches fighters)", weight: 2},
    {name: "Corvette (Light attack ship)", weight: 4},
    {name: "Courier (Fast transport)", weight: 5},
    {name: "Cruiser (Medium attack ship)", weight: 3},
    {name: "Dreadnought (Heavy attack ship)", weight: 2},
    {name: "Escape pod (Survival craft)", weight: 3},
    {name: "Foundry (Mobile construction platform)", weight: 3},
    {name: "Harvester (Fuel or energy excavator)", weight: 5},
    {name: "Hauler (Heavy transport)", weight: 6},
    {name: "Hunter (Stealthy attack ship)", weight: 3},
    {name: "Ironhome (Habitat)", weight: 2},
    {name: "Mender (Utility or repair)", weight: 4},
    {name: "Outbounder (Remote survey or research)", weight: 5},
    {name: "Pennant (Command ship)", weight: 3},
    {name: "Prospector (Mineral excavator)", weight: 6},
    {name: "Reclaimer (Salvage or rescue)", weight: 5},
    {name: "Shuttle (Short-range transport)", weight: 3},
    {name: "Snub fighter (Small attack craft)", weight: 3},
    {name: "Multipurpose (Tasked with the completion of its mission)", weight: 15},
    {name: "Unusual or unknown", weight: 2},
    {name: "Fleet", weight: 10},
    {name: "Currently in conflict with another ship", weight: 6}
]);

// Starship-Fleet
createTable("Starship-Fleet", [
    {name: "battle fleet", weight: 10},
    {name: "pirate wing", weight: 15},
    {name: "raider horde", weight: 10},
    {name: "salvager hive", weight: 15},
    {name: "settler caravan", weight: 10},
    {name: "trade caravan", weight: 10},
    {name: "fleet of transports and escorts", weight: 20},
    {name: "Starship Mission", weight: 10}
]);

// Starship-Initial-Contact
createTable("Starship-Initial-Contact", [
    {name: "Familiar", weight: 3},
    {name: "Friendly", weight: 12},
    {name: "Neutral / automated", weight: 10},
    {name: "Wary", weight: 10},
    {name: "Dismissive", weight: 5},
    {name: "Uncooperative", weight: 10},
    {name: "Hostile", weight: 15},
    {name: "Asking for help", weight: 15},
    {name: "In battle", weight: 5},
    {name: "Unresponsive", weight: 5},
    {name: "Destroyed", weight: 5},
    {name: "Derelict", weight: 5}
]);

// Starship-First-Look
createTable("Starship-First-Look", [
    {name: "Abnormal sensor readings", weight: 4},
    {name: "Brightly painted", weight: 4},
    {name: "Bristling with weapons", weight: 5},
    {name: "Dark or stealthy", weight: 5},
    {name: "Heavy armor", weight: 5},
    {name: "Immobile", weight: 5},
    {name: "Intimidating profile", weight: 5},
    {name: "Large sensor arrays", weight: 4},
    {name: "Leaking radiation", weight: 4},
    {name: "Low-profile or disguised", weight: 4},
    {name: "Modern or advanced design", weight: 4},
    {name: "Obsolete design", weight: 5},
    {name: "Obvious damage", weight: 5},
    {name: "Biological components", weight: 4},
    {name: "Ornate markings", weight: 4},
    {name: "Oversized engines", weight: 4},
    {name: "Prominent guild emblem", weight: 4},
    {name: "Refitted or repurposed hull", weight: 5},
    {name: "Scarred hull", weight: 5},
    {name: "Built from scrap", weight: 5},
    {name: "Towing or linked", weight: 5},
    {name: "Descriptor + Focus", weight: 5}
]);

// Starship-Mission-Terminus
createTable("Starship-Mission-Terminus", [
    {name: "Blockade a location", weight: 3},
    {name: "Break a blockade", weight: 3},
    {name: "Collect a resource", weight: 3},
    {name: "Command others", weight: 2},
    {name: "Conduct diplomacy", weight: 3},
    {name: "Conduct espionage", weight: 3},
    {name: "Conduct piracy", weight: 3},
    {name: "Conduct research", weight: 3},
    {name: "Defend against an attack", weight: 3},
    {name: "Deliver messages or data", weight: 3},
    {name: "Establish a settlement", weight: 3},
    {name: "Evacuate a location", weight: 3},
    {name: "Explore a region", weight: 2},
    {name: "Hold prisoners", weight: 2},
    {name: "Hunt down another ship", weight: 3},
    {name: "Launch an attack", weight: 3},
    {name: "Patrol an area", weight: 3},
    {name: "Provide medical aid", weight: 3},
    {name: "Provide repairs", weight: 3},
    {name: "Provide shelter", weight: 3},
    {name: "Quarantine a danger", weight: 2},
    {name: "Raid a settlement", weight: 3},
    {name: "Resupply a settlement", weight: 3},
    {name: "Retrieve salvage", weight: 3},
    {name: "Search and rescue", weight: 3},
    {name: "Smuggle cargo", weight: 3},
    {name: "Survey a site", weight: 3},
    {name: "Test a technology", weight: 2},
    {name: "Transport cargo", weight: 3},
    {name: "Transport passengers", weight: 3},
    {name: "Action + Theme", weight: 5},
    {name: "Roll twice", weight: 10}
]);

// Starship-Mission-Outlands
createTable("Starship-Mission-Outlands", [
    {name: "Blockade a location", weight: 2},
    {name: "Break a blockade", weight: 2},
    {name: "Collect a resource", weight: 3},
    {name: "Command others", weight: 2},
    {name: "Conduct diplomacy", weight: 2},
    {name: "Conduct espionage", weight: 2},
    {name: "Conduct piracy", weight: 3},
    {name: "Conduct research", weight: 4},
    {name: "Defend against an attack", weight: 4},
    {name: "Deliver messages or data", weight: 4},
    {name: "Establish a settlement", weight: 4},
    {name: "Evacuate a location", weight: 4},
    {name: "Explore a region", weight: 4},
    {name: "Hold prisoners", weight: 2},
    {name: "Hunt down another ship", weight: 3},
    {name: "Launch an attack", weight: 3},
    {name: "Patrol an area", weight: 2},
    {name: "Provide medical aid", weight: 3},
    {name: "Provide repairs", weight: 3},
    {name: "Provide shelter", weight: 3},
    {name: "Quarantine a danger", weight: 2},
    {name: "Raid a settlement", weight: 3},
    {name: "Resupply a settlement", weight: 4},
    {name: "Retrieve salvage", weight: 3},
    {name: "Search and rescue", weight: 2},
    {name: "Smuggle cargo", weight: 2},
    {name: "Survey a site", weight: 3},
    {name: "Test a technology", weight: 2},
    {name: "Transport cargo", weight: 3},
    {name: "Transport passengers", weight: 2},
    {name: "Action + Theme", weight: 5},
    {name: "Roll twice", weight: 10}
]);

// Starship-Mission-Expanse
createTable("Starship-Mission-Expanse", [
    {name: "Blockade a location", weight: 2},
    {name: "Break a blockade", weight: 2},
    {name: "Collect a resource", weight: 4},
    {name: "Command others", weight: 2},
    {name: "Conduct diplomacy", weight: 2},
    {name: "Conduct espionage", weight: 2},
    {name: "Conduct piracy", weight: 2},
    {name: "Conduct research", weight: 6},
    {name: "Defend against an attack", weight: 3},
    {name: "Deliver messages or data", weight: 4},
    {name: "Establish a settlement", weight: 6},
    {name: "Evacuate a location", weight: 4},
    {name: "Explore a region", weight: 6},
    {name: "Hold prisoners", weight: 2},
    {name: "Hunt down another ship", weight: 2},
    {name: "Launch an attack", weight: 2},
    {name: "Patrol an area", weight: 2},
    {name: "Provide medical aid", weight: 2},
    {name: "Provide repairs", weight: 2},
    {name: "Provide shelter", weight: 4},
    {name: "Quarantine a danger", weight: 2},
    {name: "Raid a settlement", weight: 2},
    {name: "Resupply a settlement", weight: 4},
    {name: "Retrieve salvage", weight: 2},
    {name: "Search and rescue", weight: 2},
    {name: "Smuggle cargo", weight: 2},
    {name: "Survey a site", weight: 2},
    {name: "Test a technology", weight: 2},
    {name: "Transport cargo", weight: 4},
    {name: "Transport passengers", weight: 2},
    {name: "Action + Theme", weight: 5},
    {name: "Roll twice", weight: 10}
]);

        sendChat("API", `/w gm All Starforged rollable tables and Macros have been created. It is recommended that you check all the Macro "in bar" boxes for ease of use. You are now Starforged!`);
    }
});

function createTable(name, items) {
    var table = createObj("rollabletable", {
        name: name,
        showplayers: false
    });

    items.forEach(function(item) {
        createObj("tableitem", {
            _rollabletableid: table.get("_id"),
            name: item.name,
            weight: item.weight
        });
    });
}
