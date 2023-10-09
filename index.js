fetch('video/readable-stream/url')
                .then( async (response) => {
                    const reader = response.body.getReader();
                    const stream = new ReadableStream({
                    start(controller) {
                        function pump() {
                        return reader.read().then(({ done, value }) => {
                            if (done) {
                            controller.close();
                            return;
                            }
                            controller.enqueue(value);
                            return pump();
                        });
                        }
                        return pump();
                    },
                    });
                    return stream.getReader().read().then(function pump({value}) {
                        const mimeType = 'jpeg'; 
                        const file = new File([value], 'frame', { type: mimeType });
                        return file;
                        // if you want to show the image in html
                        // const blob = new Blob([value]);
                        // const url = URL.createObjectURL(blob); 
                        // return url;
                    })
                })
                .then((data) => {
                    console.log(data)
                    return;
                })
                .catch((err) => console.error(err));