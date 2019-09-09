# Metronome

A minimalist metronome for musicians. 
Designed for use during practice sessions: can be used with simple and intuitive gestures.

Tap on any element ('numerator/denominator' of time signature, bpm, mute percentage) to edit it. Swipe up or down to increase or decrease the value of the active element. When editing bpm, longer swipes result in larger changes in bpm; so when you get close to your desired bpm you can make small swipes to have precise control.

Mute percentage is a feature borrowed from Avi Bortnik's 'Time Guru' app. It randomly mutes a certain percentage of metronome clicks to force the musician to get better at timing beats. As mute percentage gets higher, i.e less sound is played, the words 'mute percentage' get brighter.

Current design does not allow for on-time clicks because sounds in react native are asynchronous (not good for time-based apps!). This can be rectified using a web-based sound package - this is one important thing to fix.
Removing this async sound function also fixes the problem of 'double' swipes when editing. 
