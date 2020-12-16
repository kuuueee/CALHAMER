# CALHAMER
This Discord Bot manages player interactions as well as submissions for the game.

## USER COMMANDS

### anon-message

Description: Sends an anonymous message to the country of the user's choosing\n
Usage: !anon-message {country receiving message} {message}\n
Example: !anon-message france if you support england this round, germany and austria will make an alliance.


### country-message

Description: Sends message to the country of the users choosing notifying which country sent the message\n
Usage: !country-message {country receiving message} {message}\n
Example: !country-message france we will support your move into brussels if you give us passage through belgium


### date

Aliases: time current-time\n
Description: returns the current date to the user\n
Usage: !date


### order

Aliases: submit\n
Description: Sends the order to a log that the game master can see.\n
Usage: !order {current time} {order that you want to submit}\n
Example: !order Fall-1901 Army Par -> Pic, Fleet Eng -> Iri, etc..\n
please send orders from your designated country channel.

## ADMIN COMMANDS

### phase

Description: Allows the game master to advance to the next season, or reset to the first season\n
Usage: !phase  season to advance submissions one season\n
       !phase reset to reset the current season to Fall_1901


### reset-submission

Description: Resets the submission status of all countries for the current year\n
Usage: !reset-submission
