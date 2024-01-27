package main

import (
	"fmt"

	"github.com/gordonklaus/portaudio"
)

func main() {
	// Initialize PortAudio
	portaudio.Initialize()
	defer portaudio.Terminate()

	// Set up an input stream with PortAudio
	stream, err := portaudio.OpenDefaultStream(1, 0, 44100, 0, processAudio)
	if err != nil {
		panic(err)
	}
	defer stream.Close()

	// Start capturing
	err = stream.Start()
	if err != nil {
		panic(err)
	}

	fmt.Println("Capturing audio. Press Enter to stop.")
	fmt.Scanln()

	// Stop capturing
	err = stream.Stop()
	if err != nil {
		panic(err)
	}
}

func processAudio(in []float32) {
	// Process incoming audio data here
	// For example, you could print the amplitude of each sample or write it to a file
	for _, sample := range in {
		if sample > 0.5 {
			fmt.Println("0.5")
		}
	}
}
