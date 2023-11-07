class Test extends OpenScript.Mediator {
    async $$testEvent(event) {
        console.log(`handled ${event} from Test mediator`);
    }

    objectMethod(name){
        console.log(`This method is in Test Mediator and was called by a namespaced handler ${name}`);
    }

    $$namespace = {
        hello: () => {
            this.objectMethod('event1');
        },

        $$sns: {
            hello: () => {
                this.objectMethod('sns:event2');
            }
        }
    }
}