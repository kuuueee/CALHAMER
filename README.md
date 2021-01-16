# CALHAMER
This Discord Bot manages player interactions as well as submissions for the board game Diplomacy devolped by Avalon Hill.

## USER COMMANDS

### anon-message

Aliases: message-anon, message_anon, anon_message\
Description: Sends an anonymous message to the country of the user's choosing\
Usage: !anon-message {country receiving message} {message}\
Example: !anon-message france if you support england this round, germany and austria will make an alliance.


### country-message

Aliases: message-country, message_country, country_message\
Description: Sends message to the country of the users choosing notifying which country sent the message\
Usage: !country-message {country receiving message} {message}\
Example: !country-message france we will support your move into brussels if you give us passage through belgium


### date

Aliases: time, current-time\
Description: returns the current date to the user\
Usage: !date


### order

Aliases: submit\
Description: Sends the order to a log that the game master can see.\
Usage: !order {current time} {order that you want to submit}\
Example: !order Fall-1901 Army Par -> Pic, Fleet Eng -> Iri, etc..\
please send orders from your designated country channel.

## beak

Aliases: trash-talk, insult, shit-talk\
Description: Sends an anonymous message to the trash-talk channel.\
Usage: !beak {your message}.\
Example: !beak Germany's fleet in Denmark trying to support a move into Norway was laughable.


## ADMIN COMMANDS

### phase

Description: Allows the game master to advance to the next season, or reset to the first season\
Usage: !phase  season to advance submissions one season\
       !phase reset to reset the current season to Fall_1901


### reset-submission

Description: Resets the submission status of all countries for the current year\
Usage: !reset-submission
