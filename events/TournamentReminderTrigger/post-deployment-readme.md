### Run the below command to add resource permission to lmabda
aws lambda --profile kracknow --region ap-south-1 add-permission --function-name TournamentReminderTriggerEvent-prod-TournamentReminderTrigger --statement-id 20001 --action 'lambda:InvokeFunction' --principal events.amazonaws.com --source-arn arn:aws:events:ap-south-1:295165856122:rule/tournament-reminder-* 