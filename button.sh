#!/bin/bash

string=`arduino-serial-master/arduino-serial -b 9600 -p /dev/ttyUSB1 -r -t ${time}00`

tstring=`echo $string | sed 's/\(.\)/\1\n/g' | uniq | grep 'T' `

if [ "$tstring" = "T" ]; then
	echo "1" > shell.txt
elif [ "$tstring" == "MT" ]; then
	echo "1" >shell.txt
else	
	echo "-1" >shell.txt
fi




