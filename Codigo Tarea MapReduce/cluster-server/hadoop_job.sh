
hadoop jar /usr/lib/hadoop/hadoop-streaming.jar -files gs://proyecto-dba2/articulos-mr/mapper.py,gs://proyecto-dba2/articulos-mr/reducer.py -mapper "python mapper.py" -reducer "python reducer.py" -input gs://proyecto-dba2/wikipedia-data/*.json -output gs://proyecto-dba2/output/$1
