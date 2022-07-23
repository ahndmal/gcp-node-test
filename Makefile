deploy:
	gcloud functions deploy node2 --trigger-http --runtime=nodejs16 --entry-point=helloWorld --allow-unauthenticated --memory=256MB