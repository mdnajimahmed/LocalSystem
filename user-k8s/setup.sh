apt-get -y update; 
apt-get -y install curl;
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"
echo "$(cat kubectl.sha256)  kubectl" | sha256sum --check

# Check the result of the validation
if [ $? -eq 0 ]; then
    echo "Validation successful: kubectl binary is correct."
else
    echo "Validation failed: kubectl binary is corrupted or invalid."
    exit 1
fi

chmod +x kubectl
mkdir -p ~/.local/bin
mv ./kubectl ~/.local/bin/kubectl
kubectl version --client
sudo apt install -y vim
apt install -y openssl
mkdir mkdir -p ~/.kube