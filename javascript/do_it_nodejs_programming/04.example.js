// EventEmitter
process.on('tick', (count) => {
    console.log('tick event %s', count);
});

const tickEvent = setTimeout(() => {
    console.log('2000ms 후에 tick 이벤트 전달 시도.');
    process.emit('tick', '1');
}, 2000);
