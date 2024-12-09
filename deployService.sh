while getopts k:h:s: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
        s) service=${OPTARG};;
    esac
done

if [[ -z "$key" || -z "$hostname" || -z "$service" ]]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deployService.sh -k <pem key file> -h <hostname> -s <service>\n\n"
    exit 1
fi

printf "\n----> Deploying React bundle $service to $hostname with $key\n"

# Step 1: Build the distribution package
printf "\n----> Building the distribution package\n"
rm -rf build
mkdir build

# Install necessary dependencies and build the frontend
cd frontend
npm install
npm run build # Build the React frontend using Vite
cd ..

# Move the frontend files from the dist directory to the build directory
cp -rf frontend/dist/* build/public  # Copy the React frontend build to the distribution folder

# Move backend files (e.g. service files) into the build folder
cp service/*.js build  # Copy backend JS files to the build folder
cp service/*.json build # Copy backend JSON files to the build folder

# Step 2: Clear out the previous distribution on the target server
printf "\n----> Clearing out previous distribution on the target\n"
ssh -i "$key" ubuntu@$hostname << ENDSSH
rm -rf services/${service}
mkdir -p services/${service}
ENDSSH

# Step 3: Copy the distribution package to the target server
printf "\n----> Copy the distribution package to the target\n"
scp -r -i "$key" build/* ubuntu@$hostname:services/$service

# Step 4: Deploy the service on the target
printf "\n----> Deploy the service on the target\n"
ssh -i "$key" ubuntu@$hostname << ENDSSH
bash -i
cd services/${service}
npm install  # Install any necessary dependencies on the server
pm2 restart ${service}  # Restart the service with pm2
ENDSSH

# Step 5: Clean up local build folder
printf "\n----> Removing local copy of the distribution package\n"
rm -rf build
rm -rf frontend/dist  # Optionally remove the frontend dist folder as well
