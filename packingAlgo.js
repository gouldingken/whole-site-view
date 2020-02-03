const Bucket = (limit, getter) => {
    const _elements = [];
    let _remaining = limit;
    return {
        addChild: (child) => {
            _elements.push(child);
            _remaining -= getter(child);
        },
        canAdd: (child) => {
            return getter(child) <= _remaining;
        },
        remaining: () => {
            return _remaining;
        },
        elements: () => {
            return _elements;
        }
    }
};

const packingAlgo = (numberOfBuckets, maxHeight, getter) => {

    const _buckets = [];
    for (let i = 0; i < numberOfBuckets; i++) {
        const bucket = Bucket(maxHeight, getter);
        _buckets.push(bucket);
    }
    var _findNextEmptiest = function () {
        var nextEmptiest = null;
        _buckets.forEach((bucket, i) => {
            if (nextEmptiest === null || bucket.remaining() > nextEmptiest.remaining()) {
                nextEmptiest = bucket;
            }
        });
        return nextEmptiest;
    };

    var fitBlocks = function (children) {
        children.sort(function (a, b) {
            return getter(b) - getter(a);
        });

        children.forEach((child, i) => {
            var bucket = _findNextEmptiest();
            if (bucket) {
                if (bucket.canAdd(child)) {
                    bucket.addChild(child);
                } else {
                    //if the emptiest bucket can't fit this one, let's add a new bucket
                    bucket = Bucket(maxHeight, getter);
                    _buckets.push(bucket);
                }
            }
        });

        return _buckets;
    };

    return {fitBlocks};
};

module.exports = packingAlgo;