#!/bin/bash
 
USER_POOL_ID=eu-west-1_MUEHMQ2R2
 
 
RUN=1
until [ $RUN -eq 0 ] ; do
echo "Listing users"
USERS=`aws --profile default cognito-idp list-users  --user-pool-id ${USER_POOL_ID} | grep Username | awk -F: '{print $2}' | sed -e 's/\"//g' | sed -e 's/,//g'`
if [ ! "x$USERS" = "x" ] ; then
	for user in $USERS; do
		echo "Deleting user $user"
		aws --profile default cognito-idp admin-delete-user --user-pool-id ${USER_POOL_ID} --username ${user}
		echo "Result code: $?"
		echo "Done"
	done
else
	echo "Done, no more users"
	RUN=0
fi
done
