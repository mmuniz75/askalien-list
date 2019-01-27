ng build --prod --build-optimizer
aws s3 sync dist s3://view.askalien.men/ --delete