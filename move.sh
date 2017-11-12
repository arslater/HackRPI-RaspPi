#!/bin/bash

time=$1

string=`arduino-serial-master/arduino-serial -b 9600 -p /dev/ttyUSB1 -r -t 200`

mstring=`echo $string | sed 's/\(.\)/\1\n/g' | uniq | grep 'M' `


if [ "$mstring" = "M" ]; then
	echo "1" > shell.txt
elif [ "$mstring" == "MT" ]; then
	echo "1" >shell.txt
else	
	echo "-1" >shell.txt
fi




