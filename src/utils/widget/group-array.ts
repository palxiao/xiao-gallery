/**
 * 数组处理方法
 */

class GroupArray {
    private originalArray: Array<string | number | object>

    constructor(originalArray = []) {
        this.originalArray = originalArray
    }

    groupByKey(key: string): any[] {
        return this.groupBy(item => {
            if (typeof item[key] === 'undefined') {
                return []
            }
            return [item[key]]
        })
    }

    groupBy(fn: (item: any) => void): any[] {
        const groups: Type.Object = {}
        for (const item of this.originalArray) {
            const group = JSON.stringify(fn(item))
            groups[group] = groups[group] || []
            groups[group].push(item)
        }
        return Object.keys(groups).map((group) => {
            return groups[group]
        })
    }
}

export default GroupArray