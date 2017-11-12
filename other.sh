#!/bin/bash

time=$1

string=`arduino-serial-master/arduino-serial -b 9600 -p /dev/ttyUSB1 -r -t ${time}00`

echo $string

mstring=`echo $string | tr ':' '\n' | grep 'M' `
tstring=`echo $string | tr ':' '\n' | grep 'T' `


if [ "$mstring" ]; then
	echo "moved"

fi
if [ "$tstring" = "T" ]; then
	echo "button"
fi




