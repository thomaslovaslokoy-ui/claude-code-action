.PHONY: build test lint fmt vet tidy

build:
	go build -o bin/claude-code-action ./cmd/...

test:
	go test ./...

lint:
	golangci-lint run ./...

fmt:
	gofmt -s -w .

vet:
	go vet ./...

tidy:
	go mod tidy
