/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-undef */
// API for logic scripters:
//
// MAKE DECK FROM LIBRARY FUNCTIONS:
// function DECK_MakeFromLibrary(library)
// function DECK_MakeFromLibraryFiltered(library, filter)
// function DECK_MakeFromLibraryFilteredWithCopies(libary, filter, copies)
// function DECK_MakeFromLibraryValueGreater(library, threshold)
// function DECK_MakeFromLibraryValueGreaterEqual(library, threshold)
// function DECK_MakeFromLibraryValueLess(library, threshold)
// function DECK_MakeFromLibraryValueLessEqual(library, threshold)
// function DECK_Empty()
//
// MANIPULATE DECK(S) FUNCTIONS
// function DECK_Shuffle(deck)
// function DECK_DrawFromTop(deck, count)
// function DECK_DrawFromBottom(deck, count)
// function DECK_Stack(top, bottom)
// function DECK_PutOnTopOf(movingDeck, existingDeck)
// function DECK_PutInMiddleOf(movingDeck, existingDeck)
// function DECK_PutOnBottomOf(movingDeck, existingDeck)
// function DECK_Split(deckToSplit, timesToSplit)

// QUERY DECK FUNCTIONS
// function DECK_Count(deck)
// function DECK_TotalValue(library, deck)

// programmers only below this line, mate!
// ---------------------------------------

// note: below to arrays *are* mutated once for initialization, but will never be reassigned.
const libraryFilters = []
const libraryIndices = []

installCardLibrary(function(libraryName, libraryIndex, cards) {
    libraryFilters[libraryName] = cards
    libraryIndices[libraryName] = libraryIndex
})

// a deck is an array of indices... but don't tell the designers that! Everyone needs to use these helper functions instead, and not worry what a deck is:

//unfiltered version
const DECK_MakeFromLibrary = (library) => {
    const deck = []

    const libraryIndex = libraryIndices[library]

    libraryFilters[library].forEach(function(card) {
        const combinedCard = [[libraryIndex, card.index]]
        deck.push(combinedCard)
    })

    if (!deck.length) {
        throw new Error(`Call to DECK_MakeFromLibrary with library '${library}' yielded no cards. Double check the library is spelled correctly.`)
    }

    return deck
}

const DECK_GetLibraryIndexFromName = (library) => {
    return libraryIndices[library]
}

const DECK_MakeFromLibraryFiltered = (library, filter) => {
    const deck = []

    const libraryIndex = libraryIndices[library]

    libraryFilters[library].forEach(function(card) {
        let matchesTag = true
        if (Array.isArray(filter)) {
            matchesTag = true
            filter.forEach(function(singleFilter) {
                let singleMatch = false
                card["tags"].forEach(function(tagObject) {
                    if (singleFilter === tagObject.tag) {
                        singleMatch = true
                    }
                })
                if (!singleMatch) {
                    matchesTag = false
                }
            })
        } else {
            matchesTag = false
            card["tags"].forEach(function(tagObject) {
                if (tagObject.tag === filter) {
                    matchesTag = true
                }
            })
        }
        if (matchesTag) {
            const combinedCard = [[libraryIndex, card.index]]
            deck.push(combinedCard)
        }
    })

    if (!deck.length) {
        throw new Error(`Call to DECK_MakeFromLibraryFiltered with library '${library}' and filter '${filter}' yielded no cards. Double check the library is spelled correctly and the filter isn't too restrictive.`)
    }

    return deck
}

const DECK_MakeFromLibraryFilteredWithCopies = (library, filter, copies) => {
    const multiDeck = DECK_Empty()
    for (let i = 0; i < copies; ++i) {
        const filteredCards = DECK_MakeFromLibraryFiltered(library, filter)
        DECK_PutOnTopOf(filteredCards, multiDeck)
    }

    return multiDeck
}

const DECK_MakeFromLibraryValueGreater = (library, threshold) => {
    const deck = []

    const libraryIndex = libraryIndices[library]

    libraryFilters[library].forEach(function(card) {
        if (card["value"] > threshold) {
            const combinedCard = [[libraryIndex, card.index]]
            deck.push(combinedCard)
        }
    })

    return deck
}

const DECK_MakeDeckFromLibraryValueGreaterEqual = (library, threshold) => {
    const deck = []

    const libraryIndex = libraryIndices[library]

    libraryFilters[library].forEach(function(card) {
        if (card["value"] >= threshold) {
            const combinedCard = [[libraryIndex, card.index]]
            deck.push(combinedCard)
        }
    })

    return deck
}

const DECK_MakeDeckFromLibraryValueLess = (library, threshold) => {
    const deck = []

    const libraryIndex = libraryIndices[library]

    libraryFilters[library].forEach(function(card) {
        if (card["value"] < threshold) {
            const combinedCard = [[libraryIndex, card.index]]
            deck.push(combinedCard)
        }
    })

    return deck
}

const DECK_MakeDeckFromLibraryValueLessEqual = (library, threshold) => {
    const deck = []

    const libraryIndex = libraryIndices[library]

    libraryFilters[library].forEach(function(card) {
        if (card["value"] <= threshold) {
            const combinedCard = [[libraryIndex, card.index]]
            deck.push(combinedCard)
        }
    })

    return deck
}

const DECK_DuplicateDeck = (deck) => {
    const outDeck = []
    deck.forEach(function(multiCard) {
        outDeck.push(multiCard)
    })
    return outDeck
}

// takes a deck and returns a new one made only of original's card where the first one matches the filter
const DECK_MakeFromDeckFiltered = (library, deck, filter) => {
    const outDeck = []
    deck.forEach(function(multiCard) {
        const firstCard = multiCard[0]
        const cardIndex = firstCard[1] // firstCard[0] is the library index, [1] is the card index in that library
        const tags = libraryFilters[library][cardIndex].tags
        let matchesTag = false
        if (Array.isArray(filter)) {
            matchesTag = true
            filter.forEach(function(singleFilter) {
                let singleMatch = false
                tags.forEach(function(tagObject) {
                    if (singleFilter === tagObject.tag) {
                        singleMatch = true
                    }
                })
                if (!singleMatch) {
                    matchesTag = false
                }
            })
        } else {
            matchesTag = false
            tags.forEach(function(tagObject) {
                if (tagObject.tag === filter) {
                    matchesTag = true
                }
            })
        }
        if (matchesTag) {
            outDeck.push(multiCard)
        }
    })
    return outDeck
}

const DECK_Shuffle = (deck) => {
    // fisher-yates, yo
    for (let i = deck.length - 1; i > 0; i--) {
        const j = QUERY_RandomNumber(0, i)
        ;[deck[i], deck[j]] = [deck[j], deck[i]]
    }
}

const DECK_ShuffleGroup = (deck, group) => {
    // fisher-yates, yo
    for (let i = deck.length - 1; i > 0; i--) {
        const j = QUERY_RandomNumberGroup(0, i, group)
        ;[deck[i], deck[j]] = [deck[j], deck[i]]
    }
}

const DECK_DrawFromTop = (deck, count) => {
    if (count > deck.length) {
        count = deck.length
    }

    const newDraws = []

    for (let i = 0; i < count; ++i) {
        newDraws.push(deck.shift())
    }

    return newDraws
}

const DECK_DrawFromBottom = (deck, count) => {
    if (count > deck.length) {
        count = deck.length
    }

    const newDraws = []

    for (let i = 0; i < count; ++i) {
        newDraws.push(deck.pop())
    }
    return newDraws
}

const DECK_Stack = (top, bottom) => {
    const newDeck = []

    const bottomCount = bottom.length
    const topCount = top.length

    for (let i = 0; i < bottomCount; ++i) {
        newDeck.unshift(bottom.pop())
    }
    for (let i = 0; i < topCount; ++i) {
        newDeck.unshift(top.pop())
    }

    return newDeck
}

const DECK_PutOnTopOf = (movingDeck, existingDeck) => {
    const movingCount = movingDeck.length

    for (let i = 0; i < movingCount; ++i) {
        existingDeck.unshift(movingDeck.pop())
    }
}

const DECK_PutOnBottomOf = (movingDeck, existingDeck) => {
    const movingCount = movingDeck.length

    for (let i = 0; i < movingCount; ++i) {
        existingDeck.push(movingDeck.shift())
    }
}

const DECK_PutInMiddleOf = (movingDeck, existingDeck) => {
    const movingCount = movingDeck.length
    const middleOfDeck = Math.round(existingDeck.length / 2)

    for (let i = 0; i < movingCount; ++i) {
        existingDeck.splice(middleOfDeck + i, 0, movingDeck.pop())
    }
}

const DECK_Split = (deckToSplit, timesToSplit) => {
    const decks = []
    const miniDeckSize = Math.round(deckToSplit.length / timesToSplit)

    for (let i = 0; i < timesToSplit; ++i) {
        let deckSplitSize = miniDeckSize
        if (i + 1 === timesToSplit) {
            deckSplitSize = deckToSplit.length
        }
        const splitDeck = DECK_DrawFromTop(deckToSplit, deckSplitSize)

        decks.push(splitDeck)
    }

    return decks
}

const DECK_Count = (deck) => {
    return deck.length
}

const DECK_TotalValue = (libraryName, deck) => {
    let total = 0

    deck.forEach(function(card) {
        const value = libraryFilters[libraryName][card]["value"]
        total += value
    })

    return total
}

const DECK_Empty = () => {
    return []
}

const DECK_MultiplyBySingle = (originalDeck, singleDeck) => {
    // error check wanted here to make sure
    // a) singleDeck just has a single card
    if (singleDeck.length !== 1) {
        throw new Error("DECK_MultiplyBySingle given a non-single DECK")
    }

    // b) the card in singleDeck is just a single card
    if (singleDeck[0].length !== 1) {
        throw new Error("DECK_MultiplyBySingle given a non-single CARD")
    }

    const singleCard = singleDeck[0][0]
    originalDeck.forEach(function(compositeCard) {
        compositeCard.push(singleCard)
    })
}

const DECK_MultiplyByMultipleRules = (originalDeck, arrayOfRules) => {
    arrayOfRules.forEach(function(rule) {
        DECK_MultiplyBySingle(originalDeck, rule)
    })
}

const DebugLogDeckCount = (deck, includeSubCards, count) => {
    Logi("[DECK] Logging " + count + " out of " + DECK_Count(deck) + " cards.")
    const tempDeck = DECK_DrawFromTop(deck, count)
    OUTPUT_DebugLogDeck(tempDeck, includeSubCards)
    DECK_PutOnTopOf(tempDeck, deck)
}

const DECK_ReduceToBudget = (libraryName, deck, budget) => {
    let budgetRemaining = budget
    const outDeck = DECK_Empty()
    DECK_Shuffle(deck)
    deck.forEach(function(multiCard) {
        const firstCard = multiCard[0]
        const value = libraryFilters[libraryName][firstCard[1]]["value"]
        if (value <= budgetRemaining) {
            outDeck.push(multiCard)
            budgetRemaining -= value
        }
    })
    return outDeck
}
