ng build --prod
Write-Information "build completed, syncing s3 bucket..."
aws s3 sync ./dist s3://mysite-prod-codedeploy --delete --cache-control "max_age=3000000" --include ".*[^(.html)]$"
aws s3 sync ./dist s3://mysite-prod-codedeploy --cache-control "no-cache" --include ".*.html$"
aws cloudfront create-invalidation --distribution-id E1EPCR35XVCSLD --paths "/*"
