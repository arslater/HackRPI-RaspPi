#!/bin/bash

#####################################
## listens to serial input after it detects /dev/ttyUSB0 
timer=$1

	for((timer=timer;timer>0;timer--)) ; do
        cat /dev/ttyUSB0 >> .out
	sleep .1
		if [ `cat .out | wc -l` -gt 2 ]; then
			echo "Button was pressed"
			break
		fi
	done
	rm -rf .out
