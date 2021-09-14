name: "auth"

on:
  push:
    paths:
      - "services/auth/**"
      - ".github/workflows/auth.yml"

jobs:
  test:
    ## We want to define a strategy for our job
    strategy:
      ## this will contain a matrix of all of the combinations
      ## we wish to test again:
      matrix:
        go-version: [1.14.x]
        platform: [ubuntu-latest]

    ## Defines the platform for each test run
    runs-on: ${{ matrix.platform }}

    ## the steps that will be run through for each version and platform
    ## combination
    steps:
    ## sets up go based on the version
    - name: Install Go
      uses: actions/setup-go@v2
      with:
        go-version: ${{ matrix.go-version }}

    ## checks out our code locally so we can work with the files
    - name: Checkout code
      uses: actions/checkout@v2

    # run tests for route
    - name: Run tests
      run: |-
        cd services/auth
        go test ./...
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Build and push docker image
        uses: docker/build-push-action@v1
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
          dockerfile: services/auth/Dockerfile
          repository: heisenbergtdk/auth
          tag_with_ref: true
          
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:    
      - name: executing remote ssh commands using password
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USERNAME }}
          password: ${{ secrets.SSH_PASSWORD }}
          port: 22
          script: "cd /root/Verre-Tech-Back/ && sh deploy.sh"
