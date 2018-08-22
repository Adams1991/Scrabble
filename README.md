# Scrabble
Web based Scrabble like word game utilising the Oxford dictionary API. Player can place letter tiles from a selection of 7 randomly assigned tiles that is refilled once words submitted. Words are checked to see if they are in the dictionary. Secondary words are created when words join and are updated. All word created in a turn must be valid according to the API.

Created using the Pub-Sub design for information handling. Uses a MongoDB for game state perssitance. Programmed with vinilla JS.

Due to time constraints, currently: game states are saved but can't be recalled, tiles cannot be swapped, turn cannot be skipped, two player only, only one game at a time. The models have the functionality for tile swapping and aren't restricted to 2 players, client side logic needs to be written. 
